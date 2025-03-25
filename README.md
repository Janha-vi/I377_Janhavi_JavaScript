Task Manager Web app by Janhavi Kherdekar I377
This web app manages an user's to do list for the day. It is a simple task manager that can be used to add, edit, delete the tasks. It also allows the user to 
mark a task as important and still see the task in the list. The user can also mark a task as important and the task will be highlighted in order to priotize their tasks.
Tasks are stored in the localStorage to ensure persistence across page reloads.

Features:
1. Add task and task description
2. Delete task
3. Edit task
4. Mark task as completed
5. Undo mark task as completed
6. Mark task as important
7. Toggle back to task being not important
8. Filter tasks by completed, pending, or important
   
How it works:
Users enter a task name and description, then click "Add Task" to save it.
Tasks appear in a list with action buttons for Complete, Important, Edit, and Delete.
Clicking Complete toggles completion status.
Clicking Important highlights the task visually.
Clicking Edit lets users modify a task.
Clicking Delete removes a task.
The Filter dropdown lets users view completed, pending, or important tasks.
 
Technologies Used:
HTML – Structure of the web page
CSS – Styling and layout
JavaScript – Task management logic
LocalStorage – Saves tasks even after closing the browser
