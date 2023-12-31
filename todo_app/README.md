Files
- todoApp.js
- todoApp.test.js
- package.json
- README.md

For testing
- Used Jest testing framework for testing

Assumptions:
- Todos
  - make id's generate based on counter since they will always be unique this way.
- TodoList 
  - made the todoList array a private object
  - update method - assumed that you need an id to access the todo, then provide an update todo object. This returns a boolean in order not provide access to the object.
  - made the return values for some of the methods boolean to eliminate tampering with todo objects

- TodoManager
  - assumed the TodoManager will be created after the todoList is created and todos are updated since the application gets no input from user. 
  - assumed empty string for either month or year means 'no month / year indicated'
  - created todosMonth, todosYear, completedTodosMonth, completeTodosYear methods to get certain months / years or if empty string (indicating no month/year), then all months/years with ''
  
AMMENDMENTS

- add() - has channged to now accept object literals and then create Todo objects from the class with the information provided.
- listAll() - I've changed the listAll method to return a deep copy of the array. This should allow ohter objects not to mutate it.
- findTodo() - I've changed this as well to return a deep copy object, which prevents anything of the todo object when it is found.
- update() - changed so that we update the todo objects properties if there has been a change, if not keep original value. The id of the todo cannot be changed.
- Took out methods shared methods of Todo isWithinMonth, isWithinYear
- Took out methods that called those in TodoManager
- Took out tests for those methods