---
title: React에서 TypeScript Generic 활용하기
date: 2023-11-25
tags:
  - React
  - TypeScript
  - Generic
  - 성능 최적화
  - 타입 시스템
published: true
contributor:
  name: 이혜림
  social:
    github: https://github.com/matty255
---

# React에서 TypeScript Generic 활용하기

이 글에서는 React와 TypeScript를 사용하여 제네릭(Generic) 타입을 설정하는 방법, 그 필요성, 설정의 장점, 그리고 이를 구현하는 법을 깊이 있게 다루겠습니다. 제네릭 타입은 TypeScript의 강력한 기능 중 하나로, 코드의 재사용성과 타입 안전성을 높이는 데 큰 도움을 줍니다.

[[toc]]

# 제네릭 타입이란?

제네릭 타입(Generic Type)은 함수, 클래스, 또는 컴포넌트가 사용할 타입을 외부에서 지정할 수 있도록 하는 TypeScript의 기능입니다. 이는 코드의 재사용성을 높이고, 컴파일 타임에 타입 체크를 강화하여 런타임 오류를 줄이는 데 유용합니다.

## 제네릭 타입의 필요성

제네릭 타입은 다음과 같은 상황에서 필요합니다:

1. **다양한 데이터 타입 지원**: 특정 타입에 종속되지 않고 다양한 타입의 데이터를 처리할 수 있는 유연한 코드를 작성할 수 있습니다.
2. **코드 재사용성 향상**: 동일한 로직을 다양한 타입에 대해 재사용할 수 있어 중복 코드를 줄입니다.
3. **타입 안전성 강화**: 컴파일 타임에 타입을 체크하여 런타임 오류를 줄이고, 더 안전한 코드를 작성할 수 있습니다.

### 예시: 배열 요소 검색 함수

다양한 타입의 배열 요소를 검색하는 함수를 제네릭 타입 없이 작성할 경우, 각 타입별로 함수를 작성해야 합니다.

```typescript
function findNumberInArray(arr: number[], target: number): number | undefined {
  return arr.find((item) => item === target);
}

function findStringInArray(arr: string[], target: string): string | undefined {
  return arr.find((item) => item === target);
}
```

제네릭 타입을 사용하면 다음과 같이 하나의 함수로 작성할 수 있습니다.

```typescript
function findInArray<T>(arr: T[], target: T): T | undefined {
  return arr.find((item) => item === target);
}
```

위 코드에서 `T`는 제네릭 타입 변수로, 함수 호출 시 실제 타입으로 대체됩니다. 이 함수는 `number`, `string`뿐만 아니라 모든 타입의 배열에 대해 사용할 수 있습니다.

## 제네릭 타입의 장점

제네릭 타입을 사용하면 다음과 같은 이점을 얻을 수 있습니다:

1. **코드 재사용성**: 제네릭 타입을 사용하면 다양한 타입을 처리하는 하나의 컴포넌트를 작성할 수 있습니다.
2. **타입 안전성**: 컴파일 타임에 타입 체크가 강화되어 런타임 오류를 줄일 수 있습니다.
3. **가독성**: 코드가 중복되지 않으므로 가독성이 높아집니다.

# React에서의 제네릭 타입 사용

## 제네릭 타입을 사용해야 하는 상황

1. **재사용 가능한 컴포넌트 작성**: 다양한 타입의 데이터를 처리할 수 있는 컴포넌트를 작성할 때.
2. **Hooks 작성**: 다양한 타입을 지원하는 커스텀 훅을 작성할 때.
3. **유틸리티 함수 작성**: 여러 타입을 처리하는 유틸리티 함수를 작성할 때.

### 예시: 재사용 가능한 리스트 컴포넌트

제네릭 타입을 사용하여 다양한 아이템 타입을 처리할 수 있는 리스트 컴포넌트를 작성해보겠습니다.

```typescript
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T>({ items, renderItem }: ListProps<T>): React.ReactElement => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default List;
```

위 코드에서 `List` 컴포넌트는 제네릭 타입 `T`를 사용하여 다양한 타입의 아이템을 처리할 수 있습니다.

### 사용 예시

```typescript
import React from "react";
import List from "./List";

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "김철수" },
];

const App: React.FC = () => {
  return (
    <List
      items={users}
      renderItem={(user) => (
        <div>
          {user.id}: {user.name}
        </div>
      )}
    />
  );
};

export default App;
```

위 예제에서 `List` 컴포넌트는 `User` 타입의 아이템 배열을 받아서 렌더링합니다. `List` 컴포넌트는 다양한 타입의 데이터를 처리할 수 있도록 설계되었기 때문에 `User`뿐만 아니라 다른 타입의 데이터를 처리하는 데도 사용할 수 있습니다.

## 제네릭 훅 사용하기

제네릭 훅을 작성하면 다양한 타입의 상태와 효과를 관리할 수 있습니다. 예를 들어, 다양한 타입의 데이터를 가져오는 훅을 작성해보겠습니다.

### 예시: 데이터 가져오기 훅

```typescript
import { useState, useEffect } from "react";

function useFetch<T>(url: string): {
  data: T | null;
  error: string | null;
  loading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
```

### 사용 예시

```typescript
import React from "react";
import useFetch from "./useFetch";

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const { data, error, loading } = useFetch<User[]>(
    "https://api.example.com/users"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default App;
```

위 예제에서 `useFetch` 훅은 제네릭 타입 `T`를 사용하여 다양한 타입의 데이터를 가져올 수 있습니다. `App` 컴포넌트는 `User` 타입의 데이터를 가져와서 렌더링합니다.

# 제네릭 타입 설정 방법

## 함수에 제네릭 타입 설정

함수에 제네릭 타입을 설정하면 다양한 타입의 인자와 반환 값을 처리할 수 있습니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42); // T가 number로 설정됨
const str = identity<string>("Hello"); // T가 string으로 설정됨
```

## 클래스에 제네릭 타입 설정

클래스에 제네릭 타입을 설정하면 다양한 타입의 속성과 메서드를 처리할 수 있습니다.

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
```

## 컴포넌트에 제네릭 타입 설정

컴포넌트에 제네릭 타입을 설정하면 다양한 타입의 props를 처리할 수 있습니다.

```typescript
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T>({ items, renderItem }: ListProps<T>): React.ReactElement => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default List;
```

# 고급 제네릭 타입 사용

## 제약 조건 설정

제네릭 타입에 제약 조건을 설정하여 특정 조건을 만족하는 타입만 받을 수 있습니다.

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // 이제 length 프로퍼티를 사용할 수 있습니다.
  return arg;
}

// 올바른 사용
loggingIdentity({ length: 10, value: 3 });

// 잘못된 사용
loggingIdentity(3); // 오류: 'number' 형식에 'length' 속성이 없습니다.
```

## 기본 타입 설정

제네릭 타입에 기본 타입을 설정할 수 있습니다.

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}

const stringArray = createArray(3, "hello"); // string 배열
const numberArray = createArray<number>(3, 42); // number 배열
```

## 복잡한 타입 조합

제네릭 타입을 사용하면 복잡한 타입 조합을 다룰 수 있습니다.

### 예시: API 응답 타입 정의

```typescript
interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.status === 200 && response.data) {
    return response.data;
  } else {
    console.error(response.error);
    return null;
  }
}
```

### 사용 예시

```typescript
interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "홍길동" },
  error: null,
  status: 200,
};

const userData = handleApiResponse(userResponse);
console.log(userData); // { id: 1, name: '홍길동' }
```

# 결론

React와 TypeScript에서 제네릭 타입을 사용하면 코드의 재사용성을 높이고 타입 안전성을 강화할 수 있습니다. 이를 통해 더 안정적이고 유지보수하기 쉬운 코드를 작성할 수 있습니다. 제네릭 타입을 활용하여 컴포넌트와 훅, 유틸리티 함수 등을 작성하면 다양한 상황에서 코드의 품질과 성능을 개선할 수 있습니다.

---

질문이나 제안 사항이 있으시면 GitHub에서 연락 주세요. 행복한 코딩 되세요!

[^1]: [TypeScript Docs - Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
[^2]: [React Docs - TypeScript with React](https://reactjs.org/docs/static-type-checking.html#typescript)

---

## 제네릭 타입을 활용한 실전 예제

지금까지 제네릭 타입의 개념과 기본적인 사용 방법을 살펴보았습니다. 이제 실제로 제네릭 타입을 활용하여 실전 예제를 만들어보겠습니다.

### 예시: 제네릭 폼 컴포넌트

폼은 다양한 타입의 데이터를 입력받고 제출하는 일반적인 UI 요소입니다. 제네릭을 사용하면 다양한 타입의 데이터를 처리하는 폼 컴포넌트를 쉽게 작성할 수 있습니다.

```typescript
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

function Form<T>({ initialValues, onSubmit }: FormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(initialValues).map((key) => (
        <div key={key}>
          <label>
            {key}:
            <input
              type="text"
              name={key}
              value={(values as any)[key]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
```

### 사용 예시

```typescript
import React from "react";
import Form from "./Form";

interface UserFormValues {
  username: string;
  email: string;
}

const initialValues: UserFormValues = {
  username: "",
  email: "",
};

const App: React.FC = () => {
  const handleSubmit = (values: UserFormValues) => {
    console.log(values);
  };

  return <Form initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default App;
```

위 예제에서 `Form` 컴포넌트는 제네릭 타입 `T`를 사용하여 다양한 타입의 폼 데이터를 처리할 수 있습니다. `App` 컴포넌트는 `UserFormValues` 타입의 폼 데이터를 처리하는 예제입니다.

## 더 복잡한 예제: 제네릭 컨텍스트 사용하기

React 컨텍스트를 제네릭 타입으로 설정하면 다양한 타입의 데이터를 제공할 수 있습니다. 이를 통해 더 유연하고 타입 안전한 컨텍스트를 구현할 수 있습니다.

### 예시: 제네릭 컨텍스트

```typescript
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

const createGenericContext = <T>() => {
  const context = createContext<ContextProps<T> | undefined>(undefined);

  const useGenericContext = () => {
    const contextValue = useContext(context);
    if (!contextValue) {
      throw new Error("useGenericContext must be used within a Provider");
    }
    return contextValue;
  };

  return [useGenericContext, context.Provider] as const;
};

export default createGenericContext;
```

### 사용 예시

```typescript
import React from "react";
import createGenericContext from "./createGenericContext";

interface Theme {
  color: string;
}

const [useTheme, ThemeProvider] = createGenericContext<Theme>();

const ThemeComponent: React.FC = () => {
  const { value: theme, setValue: setTheme } = useTheme();

  return (
    <div style={{ color: theme.color }}>
      <p>The current theme color is {theme.color}</p>
      <button onClick={() => setTheme({ color: "blue" })}>
        Change to blue
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>({ color: "red" });

  return (
    <ThemeProvider value={{ value: theme, setValue: setTheme }}>
      <ThemeComponent />
    </ThemeProvider>
  );
};

export default App;
```

위 예제에서 `createGenericContext` 함수는 제네릭 타입 `T`를 사용하여 다양한 타입의 컨텍스트를 생성할 수 있습니다. `useTheme` 훅과 `ThemeProvider` 컴포넌트는 `Theme` 타입의 데이터를 제공하고 사용할 수 있도록 설정되었습니다.

# 결론

React와 TypeScript에서 제네릭 타입을 사용하면 코드의 재사용성을 높이고 타입 안전성을 강화할 수 있습니다. 이를 통해 더 안정적이고 유지보수하기 쉬운 코드를 작성할 수 있습니다. 제네릭 타입을 활용하여 컴포넌트와 훅, 유틸리티 함수 등을 작성하면 다양한 상황에서 코드의 품질과 성능을 개선할 수 있습니다. 이 글에서 다룬 예제들을 통해 제네릭 타입을 실전에서 어떻게 활용할 수 있는지 이해하고, 자신의 프로젝트에 적용해 보시기 바랍니다.

---

질문이나 제안 사항이 있으시면 GitHub에서 연락 주세요. 행복한 코딩 되세요!

[^1]: [TypeScript Docs - Generics](https://www.typescriptlang.org/docs/handbook/generics.html)
[^2]: [React Docs - TypeScript with React](https://reactjs.org/docs/static-type-checking.html#typescript)
