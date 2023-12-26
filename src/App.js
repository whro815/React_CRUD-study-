import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject'
import Control from './components/Control'
import React,{ Component } from 'react';



class App extends Component{

  constructor(props){
      super(props);
      // this.max_content_id = 3;
      this.state = {
        mode:'create',
        welcome:{
          title:'welcome',
          desc : 'holeee!'
        },
        selected_content_id:2,
        subject:{
          title:'WEB',
          sub : 'World Wid Web!'
        },
        contents:[
          {id:1,title:'HTML', desc:'Html is hyperText'},
          {id:2, title:'css', desc:'Html is css'},
          {id:3,title:'javascript', desc:'Html is javascript'}
        ]

      }
}
  getReadContent(){
    var i =  0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
    i = i +1;
    }
  }
  getContent(){
    var _title, _desc ,_article = null;

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content._title} desc={_content._desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
          //add content to this.state.contents
          this.max_content_id = this.max_content_id+1;
          // this.state.contents.push(
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // );
          var _contents = this.state.contents.concat(
            {id:this.max_content_id, title:_title, desc:_desc}
          )
          this.setState({
            contents:_contents 
           });
          console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _content.length){
            if(_contents[i].id === _id){
              _content[i] = {id:_id, title:_title , desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents 
           });
          console.log(_title,_desc);
      }.bind(this)}></UpdateContent>
    }
    return _article
  }
  render(){
    console.log('App render');
    return(
        <div className="App">
        {/* props의값을 전달 toc  */}
          <Subject title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          ></Subject> 
          <TOC onChangePage={function(id){
             this.setState({mode:'read',
                  selected_content_id: Number(id)
             });
          }.bind(this)} data ={this.state.contents}></TOC>
          <Control onChangeMode={function(_mode){
                  this.setState({
                    mode:_mode
                  })
          }.bind(this)}>
          </Control>
          {this.getContent()}
        </div>
    )
  }

}

export default App;
