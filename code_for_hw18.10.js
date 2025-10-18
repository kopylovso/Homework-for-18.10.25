const input = document.getElementById("taskname");
const addBtn = document.getElementById("addtask");
const filters = document.querySelectorAll("input[name='filter']");
const list = document.createElement("div");
list.className = "tasklist";
document.body.insertBefore(list, document.getElementById("counter"));
const counter = document.getElementById("counter");

let tasks = [];

function render() {
  list.innerHTML = "";
  const filter = document.querySelector("input[name='filter']:checked").value;

  tasks.forEach((t, i) => {
    if (filter === "done" && !t.done) return;
    if (filter === "todo" && t.done) return;

    const div = document.createElement("div");
    div.className = "task";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.onchange = () => {
      loading_cb(cb);
      t.done = cb.checked;
      setTimeout(render,2000);
    };

    const span = document.createElement("span");
    span.textContent = t.text;
    if(t.done) span.style.textDecoration="line-through";

    const del = document.createElement("button");
    del.textContent = "🗑️";
    del.onclick = () => {
      loading_btn(del);
      setTimeout(()=>{
        tasks.splice(i, 1);
        render();
      },1000);
    };

    div.append(cb, span, del);
    list.appendChild(div);
  });

  updateCounter();
}

function updateCounter() {
  const left = tasks.filter(t => !t.done).length;
  counter.textContent = `Осталось невыполненных задач: ${left}`;
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = "";
  render();
}

function loading_btn(del) {
  del.innerHTML = '<img src="https://дверноедело.рф/image/catalog/lazyload/lazyload-red.gif" width="40">';
  del.disabled = true;
  del.style.cursor = "not-allowed";
  const delay = Math.floor(Math.random() * 5) + 1;
  const delayMs = delay * 1000;
  setTimeout(() => {
    del.textContent = "🗑️";
    del.disabled = false;
    del.style.cursor = "pointer";
  }, delayMs);
}

function loading_add(addBtn) {
  addBtn.innerHTML = '<img src="https://дверноедело.рф/image/catalog/lazyload/lazyload-red.gif" width="20">';
  addBtn.disabled = true;
  addBtn.style.cursor = "not-allowed";
  input.disabled = true;
  input.style.cursor = "not-allowed";
  const delay = Math.floor(Math.random() * 5) + 1;
  const delayMs = delay * 1000;
  return delayMs;
}

addBtn.onclick = () => {
  const delay = loading_add(addBtn);
  setTimeout(() => {
    addTask();
    addBtn.textContent = "+";
    addBtn.disabled = false;
    addBtn.style.cursor = "pointer";
    input.disabled = false;
    input.style.cursor = "pointer";
  }, delay);
};

function loading_cb(cb) {
  const gif = document.createElement("img");
  gif.src = "https://дверноедело.рф/image/catalog/lazyload/lazyload-red.gif";
  gif.width = 30;
  gif.style.verticalAlign = "middle";
  cb.style.visibility = "hidden";
  cb.disabled = true;
  cb.style.cursor = "not-allowed";
  cb.parentNode.insertBefore(gif, cb.nextSibling);
  const delay = Math.floor(Math.random() * 5 + 1) * 1000;
  setTimeout(() => {
    gif.remove();
    cb.style.visibility = "visible";
    cb.disabled = false;
    cb.style.cursor = "pointer";
  }, delay);
}

filters.forEach(f => f.onchange = render);
render();