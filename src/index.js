// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// import { observable } from 'mobx';
// import { observer } from 'mobx-react';
// import TodoBox from './component/testMobx/test';


// var store = observable({
// 	todos: [
// 		{
// 				title: "科比"
// 		},
// 		{
// 				title: "布莱恩特"
// 		}]
// })


// ReactDOM.render(<TodoBox store={store}/>, document.getElementById('root'));
// registerServiceWorker();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { extendObservable, autorun, observable, computed } from 'mobx';

// @observer
const TodoListView = observer(class TodoListView extends Component {
	// constructor(props){
	// 	super(props)
	// }
	addItem(){
		this.props.todoList.todos.push(this.props.todoList.todos[0])
		console.log(this)
	}
	render() {
		return (
			<div>
				<ul>
					{this.props.todoList.todos.map((todo, index) =>
						<TodoView todo={todo} key={index} index={index} />
					)}
				</ul>
				Tasks left: {this.props.todoList.unfinishedTodoCount}
				<div onClick={()=>this.addItem()}>点击加一个</div>
			</div>
		)
	}
})

const TodoView = observer(({ todo, index }) =>
	<li>
		<input
			type="checkbox"
			checked={todo.finished}
			onChange={() => todo.finished = !todo.finished}
		/>{todo.title + " : "+ index}
	</li>
)
// 方法1
class TodoList {
	constructor() {
		extendObservable(this, {
			todos: [
				{
					title: "zhj!",
					finished: true,
				},
				{
					title: "wtf",
					finished: false,
				}
			],
			get unfinishedTodoCount() {
				return this.todos.filter(todo => !todo.finished).length;
			}
		})
	}
}
// 方法2
var store = observable({
	todos: [
		{
			title: "zhj!",
			finished: true,
		},
		{
			title: "wtf",
			finished: false,
		}
	],
	get unfinishedTodoCount() {
		return this.todos.filter(todo => !todo.finished).length;
	}
})
class Todolist2 {
	@observable todos = [
		{
			title: "zhj!",
			finished: true,
		},
		{
			title: "wtf",
			finished: false,
		}
	]
	@computed get unfinishedTodoCount(){
		return this.todos.filter((item)=> !item.finished).length;
	}
}

autorun(function(){
	console.log(store.todos)
})
const appState = new Todolist2();
// const store = new TodoList();
ReactDOM.render(<TodoListView todoList={appState} />, document.getElementById('root'));
