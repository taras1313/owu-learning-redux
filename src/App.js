import logo from './logo.svg';
import './App.css';

import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react";

const NestedChild = () => {
  const counter = useSelector(({counter: {value}}) => value)
  const posts = useSelector(({posts}) => posts);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();

    dispatch({
      type: 'ADD_POSTS',
      payload: json
    })
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  console.log(posts, 'posts')

  return (
    <header className="App-header">
      <h1>{counter}</h1>

      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title} ==== {post.body}</li>
        ))}
      </ul>
    </header>
  )
}

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button
        onClick={() => {
         dispatch({type: 'INC'})
       }}
      >
        inc
      </button>

      <button
        onClick={() => {
          dispatch({type: 'DEC'})
        }}
      >
        dec
      </button>
      <NestedChild />
    </div>
  );
}

export default App;
