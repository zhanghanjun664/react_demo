import React, { Component } from 'react';
import {observer} from 'mobx-react';

// 观察者
// @observer
const TodoBox = observer(class TodoBox extends Component {
	handleClick(item){
		console.log(item)
		console.log(this)
		item.title = "zhj"
	}
	render() {
		return (
			<ul>
				{this.props.store.todos.map((todo, index) => (
					<li key={index} onClick={()=>this.handleClick(todo)}>{todo.title}</li>
				))}
			</ul>
		)
	}
})

export default TodoBox;

