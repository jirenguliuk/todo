import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStore'
import AV from 'leancloud-storage'
 var APP_ID = 'PV1tmOqS9J1H5BmkFzKvg6ML-9Nh9j0Va';
 var APP_KEY = 'WUtpgrGPsk1I4sfqWKO70rbK';
 AV.init({
   appId: APP_ID,
   appKey: APP_KEY
 })
 var TestObject = AV.Object.extend('TestObject')
 var testObject = new TestObject()
 testObject.save({
   words: 'Hello World!'
 }).then(function(object) {
   alert('LeanCloud Rocks!')
 })
 
 class App extends Component {
     constructor(props){
         super(props)
         this.state = {
            newTodo: '',
            todoList: localStore.load('todoList') || []
         }
     }
        render(){
            let todos = this.state.todoList
            .filter((item)=> !item.deleted)
            .map((item,index)=>{
              return ( 
               <li key={index} >
                <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                 onDelete={this.delete.bind(this)} />
               </li>
           )
        })
        console.log(todos)

            return(
                <div className="App">
                    <h1>我的待办</h1>
                    <div className="inputWrapper">
                       <TodoInput content={this.state.newTodo} 
                       onChange={this.changeTitle.bind(this)}
                       onSubmit={this.addTodo.bind(this)} />
                    </div>
                    <ol>
                    {todos}
                    
                    </ol>
                </div>
                )
            }
            // componentDidUpdate 会在组件更新之后调用。如果我们默认「组件更新」等价于「数据更新」，那么就可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。
      componentDidUpdate(){
            localStore.save('todoList', this.state.todoList)
   }
        toggle(e, todo){
           todo.status = todo.status === 'completed' ? '' : 'completed'
           this.setState(this.state)
           //localStore.save('todoList', this.state.todoList) 
   }    
        changeTitle(event){
            this.setState({
                newTodo: event.target.value,
                 todoList: this.state.todoList
           })
               // localStore.save('todoList', this.state.todoList)
        }    
        addTodo(event){
            this.state.todoList.push({
                id: idMaker(),
                title: event.target.value,
                status: null,
                deleted: false
           })
            this.setState({
                 newTodo: '',
                 todoList: this.state.todoList
        })
               // localStore.save('todoList', this.state.todoList)
    }
        delete(event, todo){
                todo.deleted = true
                this.setState(this.state)
               // localStore.save('todoList', this.state.todoList) 
  }
 }
export default App;
   let id = 0
 
   function idMaker(){
    id += 1
    return id
 }