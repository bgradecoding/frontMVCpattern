window.addEventListener("DOMContentLoaded", function () {
  console.log("success window onload");
  const model = new TodoModel();
  const view = new TodoView(model);
  const controller = new TodoController(model, view);
});

class TodoModel {
  constructor() {
    this.currentInputTodoData;
    this.todoList = [];
  }

  getCurrentInputTodoData() {
    return this.currentInputTodoData;
  }

  setCurrentInputTodoData(data) {
    this.currentInputTodoData = data;
  }

  getTodoList() {
    return this.todoList;
  }

  pushTodoListData() {
    this.todoList.push(this.currentInputTodoData);
  }
}

class TodoView {
  constructor(model) {
    this.model = model;
  }

  createListItemNode() {
    const listItemNode = document.createElement("li");
    const textNode = document.createTextNode(
      this.model.getCurrentInputTodoData()
    );
    listItemNode.appendChild(textNode);

    return listItemNode;
  }

  registerTask(parentNode, childNode) {
    parentNode.appendChild(childNode);
  }
}

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.registerEventListener(model, view);
  }

  /*
        EVENT LISTENER 을 등록합니다.
    */
  registerEventListener(model, view) {
    const registerationBtn = view.findElementByClassName("register");
    const todoListfoldingBtn = view.findElementByClassName("fold");
    const todoListUnfoldingBtn = view.findElementByClassName("unfold");

    registerationBtn.addEventListener("click", () => {
      this.addTodoListData(model, view);
    });
  }

  /*
        BUTTON EVENT
        할일을 추가하는 이벤트를 담당합니다.
    */
  addTodoListData(model, view) {
    const currentInputData = view.findElementByName("todo").value;
    model.setCurrentInputTodoData(currentInputData);
    const todoItemNode = view.createListItemNode();
    const todoListParentNode = view.findElementByClassName("todolist");
    view.registerTask(todoListParentNode, todoItemNode);
    model.pushTodoListData();
  }
}
