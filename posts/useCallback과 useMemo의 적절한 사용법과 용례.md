---
title: useCallback과 useMemo의 적절한 사용법과 용례
date: 2024-07-03
tags:
  - React
  - useCallback
  - useMemo
  - Hooks
  - 성능 최적화
published: true
contributor:
  name: 이혜림
  social:
    github: https://github.com/honggildong
---

# useCallback과 useMemo의 적절한 사용법과 용례

이 글에서는 `useCallback`과 `useMemo`의 적절한 사용법을 살펴보겠습니다. React의 원리에 대해 설명하고, 이 두 훅이 왜 중요한지, 그리고 어디에 사용하면 좋을지, 사용하면 좋지 않은 경우에 대해 다양한 예제와 함께 설명하겠습니다.

[[toc]]

# React의 렌더링 메커니즘 이해하기

## React의 렌더링 사이클

React는 동적 사용자 인터페이스를 효율적으로 구축하기 위해 설계되었습니다. 선언적 접근 방식을 사용하며, 원하는 UI를 기술하면 React가 DOM을 그 상태와 일치시킵니다. 상태(state) 또는 props가 변경되면 React는 UI를 업데이트하기 위해 다시 렌더링합니다.

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

위의 예제에서 버튼을 클릭할 때마다 `Counter` 컴포넌트는 다시 렌더링됩니다. 일반적으로 재렌더링은 효율적이지만, 대규모 애플리케이션이나 복잡한 컴포넌트에서는 비용이 많이 들 수 있습니다.

## useCallback과 useMemo를 사용하는 이유

`useCallback`과 `useMemo`는 불필요한 재렌더링을 방지하여 성능을 최적화하는 데 도움을 주는 React 훅입니다.

### useCallback

`useCallback`은 콜백 함수의 메모이제이션된 버전을 반환합니다. 이는 의존성이 변경된 경우에만 변경되며, 참조 동등성을 활용하여 자식 컴포넌트의 불필요한 렌더링을 방지하는 데 유용합니다.

### useMemo

`useMemo`는 메모이제이션된 값을 반환합니다. 이 훅은 의존성이 변경되지 않는 한 반복해서 계산되는 것을 피하고자 할 때 유용합니다.

# useCallback의 적절한 사용법

## 기본 예제

여기 `useCallback` 사용법을 보여주는 간단한 예제가 있습니다:

```javascript
import React, { useState, useCallback } from "react";

const ChildComponent = React.memo(({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click me</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

export default ParentComponent;
```

이 예제에서 `ParentComponent`가 다시 렌더링될 때, `useCallback` 덕분에 `ChildComponent`는 다시 렌더링되지 않습니다.

## useCallback을 사용할 때

- **이벤트 핸들러**: 자식 컴포넌트에 이벤트 핸들러를 전달할 때 불필요한 렌더링을 방지하기 위해 사용.
- **메모이제이션된 콜백**: 성능 최적화를 위해 콜백을 메모이제이션해야 할 때 사용.

### useCallback의 과도한 사용 피하기

`useCallback`은 성능을 최적화할 수 있지만, 과도하게 사용하면 불필요한 복잡성과 메모리 사용을 초래할 수 있습니다. 적절히 사용하십시오.

# useMemo의 적절한 사용법

## 기본 예제

여기 `useMemo` 사용법을 보여주는 간단한 예제가 있습니다:

```javascript
import React, { useState, useMemo } from "react";

function ExpensiveComputation({ num }) {
  const compute = (n) => {
    console.log("Computing...");
    return n * 2;
  };

  const result = useMemo(() => compute(num), [num]);

  return <div>Result: {result}</div>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setNum(num + 1)}>Increment Num</button>
      <p>Count: {count}</p>
      <ExpensiveComputation num={num} />
    </div>
  );
}

export default ParentComponent;
```

이 예제에서 `ExpensiveComputation` 컴포넌트는 `num`이 변경될 때만 재계산되며, `count`가 변경될 때는 재계산되지 않습니다. 이는 `useMemo` 덕분입니다.

## useMemo를 사용할 때

- **비싼 계산**: 모든 렌더링에서 반복되지 않아야 하는 비싼 계산이 있을 때.
- **메모이제이션된 값**: 성능 최적화를 위해 계산된 값을 메모이제이션해야 할 때.

### useMemo의 과도한 사용 피하기

`useCallback`과 마찬가지로 `useMemo`를 과도하게 사용하면 불필요한 복잡성을 초래할 수 있습니다. 명확한 성능 이점이 있을 때 사용하십시오.

# 상세 예제 및 용례

## 예제: Todo 리스트 최적화

### useCallback과 useMemo 없이

```javascript
import React, { useState } from "react";

const TodoItem = ({ todo, onToggle }) => {
  console.log("TodoItem rendered");
  return (
    <li
      onClick={() => onToggle(todo.id)}
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
    >
      {todo.text}
    </li>
  );
};

const TodoList = ({ todos, onToggle }) => {
  console.log("TodoList rendered");
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn useCallback", completed: false },
  ]);

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return <TodoList todos={todos} onToggle={handleToggle} />;
};

export default App;
```

### useCallback과 useMemo 사용

```javascript
import React, { useState, useCallback, useMemo } from "react";

const TodoItem = React.memo(({ todo, onToggle }) => {
  console.log("TodoItem rendered");
  return (
    <li
      onClick={() => onToggle(todo.id)}
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
    >
      {todo.text}
    </li>
  );
});

const TodoList = React.memo(({ todos, onToggle }) => {
  console.log("TodoList rendered");
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn useCallback", completed: false },
  ]);

  const handleToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const memoizedTodos = useMemo(() => todos, [todos]);

  return <TodoList todos={memoizedTodos} onToggle={handleToggle} />;
};

export default App;
```

최적화된 버전에서는 `useCallback`을 사용해 `handleToggle` 함수를 메모이제이션하고, `useMemo`를 사용해 `todos` 배열을 메모이제이션합니다. 이를 통해 `TodoList`와 `TodoItem`은 필요한 경우에만 다시 렌더링됩니다.

## 피해야 할 사례

### 과도한 사용과 불필요한 복잡성

`useCallback`과 `useMemo`는 강력한 도구이지만, 과도하게 사용하면 코드가 이해하기 어렵고 유지보수가 힘들어

질 수 있습니다. 명확한 성능 이점이 있는 경우에만 사용하십시오.

### 의존성 오해

잘못된 의존성 배열은 버그와 예기치 않은 동작을 초래할 수 있습니다. 콜백이나 메모이제이션된 값이 의존하는 변수를 정확히 반영하도록 항상 의존성 배열을 구성하십시오.

# 결론

`useCallback`과 `useMemo`는 React 애플리케이션의 성능을 최적화하는 데 필수적인 훅이지만, 적절히 사용해야 합니다. 언제 그리고 어떻게 사용하는지 이해함으로써 불필요한 재렌더링을 방지하고 애플리케이션의 성능을 향상시킬 수 있습니다. 최적화와 코드 가독성, 유지보수성을 균형 있게 유지하는 것이 중요합니다.

---

질문이나 제안 사항이 있으시면 GitHub에서 연락주세요. 행복한 코딩 되세요!

[^1]: [React Docs - useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
[^2]: [React Docs - useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
