<template>
  <div class="container">
    <h1>📝 To Do List</h1>

    <form @submit.prevent="addTodo">
      <input v-model="title" placeholder="Enter a new task..." />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.status }">
        <input
          type="checkbox"
          :checked="todo.status"
          @change="toggleTodo(todo)"
        />
        <span>{{ todo.title }}</span>
        <button class="delete" @click="deleteTodo(todo.id)">✕</button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="empty">No tasks yet. Add one above!</p>
  </div>
</template>

<script setup>
const title = ref("");
const todos = ref([]);

const fetchTodos = async () => {
  todos.value = await $fetch("/api/todos");
};

const addTodo = async () => {
  if (!title.value.trim()) return;
  await $fetch("/api/todos", {
    method: "POST",
    body: { title: title.value }
  });
  title.value = "";
  fetchTodos();
};

const toggleTodo = async (todo) => {
  await $fetch(`/api/todos/${todo.id}`, {
    method: "PUT",
    body: { status: !todo.status }
  });
  fetchTodos();
};

const deleteTodo = async (id) => {
  await $fetch(`/api/todos/${id}`, { method: "DELETE" });
  fetchTodos();
};

onMounted(fetchTodos);
</script>

<style>
body { background: #f0f2f5; font-family: Arial, sans-serif; }

.container {
  width: 480px;
  margin: 60px auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

h1 { margin: 0 0 24px; font-size: 24px; color: #1a1a2e; }

form { display: flex; gap: 8px; margin-bottom: 24px; }

input:not([type="checkbox"]) {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

form button {
  padding: 10px 18px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

form button:hover { background: #4338ca; }

ul { list-style: none; padding: 0; margin: 0; }

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

li span { flex: 1; font-size: 15px; color: #333; }

li.done span { text-decoration: line-through; color: #aaa; }

.delete {
  background: none;
  border: none;
  color: #f87171;
  font-size: 16px;
  cursor: pointer;
}

.empty { text-align: center; color: #aaa; margin-top: 16px; }
</style>