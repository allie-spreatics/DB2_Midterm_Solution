/* 1. HTML 문서의 DOM 내용이 완전히 로드되었을 때, 초기 Todo 목록을 불러오는 getTodos() 함수가 실행됩니다. */
//  코드 작성하기
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();
  const todoSlice = todos.slice(0, 10);

  let addList = "";
  for (const todo of todoSlice) {
    addList += `
    <li class="todo-item">
        <div>
          <input type="checkbox" /><span>${todo.title}</span>
        </div>
        <button type="button" onclick="deleteTodo(this)">X</button>
      </li>
    `;
  }
  const todoContainer = document.querySelector(".todo-list");
  todoContainer.innerHTML = addList;
}

/* 
  2. 새로운 입력창의 Todo를 Todo 목록에 추가하고, 입력창을 초기화합니다.
  - 공백이나 빈 문자열의 경우 추가될 수 없습니다.
  - 작성 버튼 클릭 시 addTodo() 함수가 실행됩니다.
  - 입력 창에서 Enter 키 입력시에도 addTodo() 함수가 실행됩니다.
*/
function addTodo() {
  const input = document.querySelector("input[name=todo]");

  if (input.value.trim() === "") return; // 빈 입력 무시

  const todoContainer = document.querySelector(".todo-list");
  todoContainer.innerHTML += `<li class="todo-item">
        <div>
          <input type="checkbox" /><span>${input.value}</span>
        </div>
        <button type="button" onclick="deleteTodo(this)">X</button>
      </li>`;

  input.value = "";
}

/*  3. x 버튼을 클릭하면 클릭한 버튼을 갖는 Todo 항목이 삭제됩니다. */
// 삭제 함수의 이름 및 모양 변경 가능
function deleteTodo(item) {
  item.parentNode.remove();
}

/* 
 4. Todo 목록 불러오기,  
 - GET https://jsonplaceholder.typicode.com/todos 요청의 응답 결과에서 맨 처음부터 10개의 원소만 잘라내어 
   투두 목록에 초기 Todo를 표시해야 합니다.
*/
document.addEventListener("DOMContentLoaded", () => {
  getTodos();
});
