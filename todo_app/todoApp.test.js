const { Todo, TodoList, TodoManager } = require('./todoApp')

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


// Todo
describe('Todo class testing', () => {
  test('Creating a Todo with correct properties', () => {
    const todo = new Todo('Clean house', '10', '2022', 'clean the house');
    expect(todo.title).toBe('Clean house');
    expect(todo.month).toBe('10');
    expect(todo.year).toBe('2022');
    expect(todo.description).toBe('clean the house');
  });
  
  test('isWithinMonthYear returns boolean', () => {
    const todo = new Todo('Clean house', '10', '2022', 'clean the house');
    expect(todo.isWithinMonthYear(12, 2022)).toBe(false);
    expect(todo.isWithinMonthYear(10, 2022)).toBe(true);
  });
  
  test('creating todos produces unique ids', () => {
    const todo = new Todo('Clean house', '10', '2022', 'clean the house');
    const todo1 = new Todo('Do laundry', '11', '2023', 'do the laundry');
  
    expect(todo.id !== todo1.id).toBe(true);
  });
})

describe('TodoList testing', () => {
  let todoList;

  beforeEach(() => {
    let todoSet = [todoData1, todoData2, todoData3, todoData4];
    todoList = new TodoList(todoSet);
  });

  test('TodoList creates an array of Todo objects', () => {
    let allTodos = todoList.listAll()
    expect(allTodos.every(todo => todo instanceof Todo)).toBe(true)
  })

  test('Adding a Todo on the list', () => {
    let firstLength = todoList.listAll().length
    let newTodo = {title:'i hope', description: 'this works'}
    todoList.add(newTodo)
    let lastLength = todoList.listAll().length
    expect(lastLength > firstLength).toBe(true)
  })
  
  test('Updating a todo', () => {
    let updatedTodo = new Todo('Check update', '12', '2023', 'see if works')
    let firstTodo = todoList.listAll()[0]
    let firstTodoId = firstTodo.id

    todoList.update(firstTodoId, updatedTodo)
    let foundTodo = todoList.findTodo(firstTodoId)
    expect(firstTodo.title !== foundTodo.title).toBe(true)
    expect(foundTodo.title).toBe('Check update')
    expect(foundTodo.month).toBe('12')
  })

  test('Deleting a todo', () => {
    let firstLength = todoList.listAll().length;
    todoList.delete(todoList.listAll()[0].id);
    let lastLength = todoList.listAll().length;

    expect(lastLength < firstLength).toBe(true)
  })

  afterEach(() => {
    todoList = [];
  });
})

describe('TodoManager testing', () => {
  let todoList;
  let todoManager;

  beforeEach(() => {
    let todoSet = [todoData1, todoData2, todoData3, todoData4];
    todoList = new TodoList(todoSet);
    todoManager = new TodoManager(todoList);
  });

  test('returns all todos', () => {
    let todoListLength = todoList.listAll().length
    let managerLength = todoManager.allTodos().length
    expect(todoListLength === managerLength).toBe(true)
  })

  test('returns all completed todos', () => {
    let newTodo = new Todo('New Todo', '12', '2023', 'completed', true)
    let newTodo2 = new Todo('New Todo2', '12', '2017', 'completed', true)
    todoList.add(newTodo)
    todoList.add(newTodo2)
    todoManager = new TodoManager(todoList);

    expect(todoManager.allCompleted().length === 2).toBe(true)
  })

  test('returns todos within month and year', () => {    
    expect(todoManager.todosMonthYear('', 2017).length === 1).toBe(true)
  })
  test('returns completed todos within month and year', () => { 
    let newTodo = new Todo('New Todo', '12', '2023', 'completed', true)
    todoList.add(newTodo)
    todoManager = new TodoManager(todoList);

    expect(todoManager.completedTodosMonthYear(12, 2023).length === 1).toBe(true)
    expect(todoManager.completedTodosMonthYear('', 2023).length === 0).toBe(true)
  })

  afterEach(() => {
    todoList = [];
    todoManager = {};
  });

})