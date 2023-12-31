
class Todo {
  static #idCount = 0;

  constructor(title, month, year, description, completed = false) {
    this.id = Todo.genId();
    this.completed = completed;
    this.title = title || '';
    this.month = month || '';
    this.year = year || '';
    this.description = description || '';
  }

  static genId() {
    return Todo.#idCount++;
  }

  isWithinMonthYear(month, year) {
    return this.month === month.toString() && this.year === year.toString();
  }
}
  
class TodoList {
  #todoList = [];

  constructor(todos) {
    todos.forEach(todo => {
      let todoObj = new Todo(todo.title, todo.month, todo.year, todo.description)
      this.#todoList.push(todoObj)
    })
  }

  add(todo) {
    let newTodo = new Todo(todo.title, todo.month, todo.year, todo.description, todo.completed)
    this.#todoList.push(newTodo);
    console.log('Todo Added!')
  }

  listAll() {
    let deepCopyList = this.deepCopy(this.#todoList)
    return deepCopyList
  }

  update(id, updatedTodo) {
    let update = false;
    let indexOfTodo = this.#todoList.findIndex(todo => todo.id === id);

    if (indexOfTodo !== -1) {
        let todoObj = this.#todoList[indexOfTodo]
        todoObj.completed = updatedTodo.completed || todoObj.completed
        todoObj.title = updatedTodo.title || todoObj.title,
        todoObj.month = updatedTodo.month || todoObj.month,
        todoObj.year = updatedTodo.year || todoObj.year,
        todoObj.description = updatedTodo.description || todoObj.description,
      console.log('Todo ' + id + ' Updated')
      return true;
    }
    console.log('Todo ' + id + ' Not Found')
    return false
  }

  delete(todoId) {
    let ind;
    for(let index = 0; index < this.#todoList.length; index++) {
      
      if (this.#todoList[index].id === todoId) {
        ind = index;
      }
    }
    if (ind !== undefined) {
      this.#todoList.splice(ind, 1);
      console.log('Todo id: ' + todoId + ' deleted')
      return true;
    }
    console.log('Todo id: ' + todoId + ' not found')
    return false;
  }

  findTodo(todoId) {
    for(let todo of this.#todoList) {
      if(todo.id === todoId) {
        return this.deepCopy(todo)
      }
    }
    return undefined;
  }

  deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return non-object types and null as is
    }
  
    let newObj = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = this.deepCopy(obj[key]); 
      }
    }
  
    return newObj;
  }
}


class TodoManager {

  constructor(todoListObj) {
    this.todoList = todoListObj.listAll();
  }
  allTodos() {
    return this.todoList
  }

  allCompleted() {
    return this.todoList.filter(todo => {
      return todo.completed;
    })
  }
  todosMonthYear(month, year) {
    return this.todoList.filter(todo => {
      return todo.isWithinMonthYear(month, year);
    })
  }
  completedTodosMonthYear(month, year) {
    return this.todoList.filter(todo => {
      return todo.isWithinMonthYear(month, year) && todo.completed;
    })
  }
}

let todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

let todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

let todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

let todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

let todoSet = [todoData1, todoData2, todoData3, todoData4];
let todoList = new TodoList(todoSet)
let todoManager = new TodoManager(todoList)


module.exports = { Todo, TodoList, TodoManager };
