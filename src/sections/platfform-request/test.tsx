import React, { forwardRef, useRef, RefObject } from "react";

// Define the props for InputComponent
interface InputProps {
  // You can define props for InputComponent here
}

// Child component that will receive the ref
const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input type="text" ref={ref} />;
  }
);

// Parent component that uses InputComponent
const ParentComponent = () => {
  // Create a ref using useRef hook
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    // Access the underlying DOM node directly via inputRef.current
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <button onClick={focusInput}>Focus Input</button>
      <InputComponent ref={inputRef} />
    </div>
  );
};

export default ParentComponent;
/**
 * https://react.dev/reference/react/forwardRef
 * 
 * An imperative behavior in the context of React refers to actions that directly manipulate the DOM or perform side effects 
 * that cannot be easily encapsulated within the typical declarative paradigm of React components. Imperative behaviors 
 * often involve direct interaction with the browser's DOM API or managing external state outside of React's virtual DOM.

### Examples of Imperative Behaviors:

1. **Focusing on an Input Element**:
   - **Example**: When a user clicks a button, you want to programmatically focus on an input field to direct their attention.
   - **Imperative Code**: `inputElement.focus();`
   - **Why Use Refs**: Refs allow you to directly access the underlying DOM node (`inputElement` in this case) and call imperative methods like `focus()`.

2. **Triggering Animations or Transitions**:
   - **Example**: Animating an element when it enters or leaves the viewport, or in response to a user action.
   - **Imperative Code**: Using `requestAnimationFrame`, directly manipulating CSS classes, or using third-party animation libraries.
   - **Why Use Refs**: Refs allow you to interact directly with the DOM to start or stop animations based on component lifecycle or user interaction.

3. **Integrating with Third-Party Libraries**:
   - **Example**: Using a complex UI library (e.g., D3.js for data visualization) that requires direct access to DOM elements.
   - **Imperative Code**: Passing specific DOM elements to library functions or callbacks.
   - **Why Use Refs**: Refs provide a way to integrate React components with external libraries that require direct DOM manipulation or access to specific elements.

4. **Managing Focus and Selection**:
   - **Example**: Selecting text within an input field programmatically or managing the focus order within a complex form.
   - **Imperative Code**: Using methods like `select()`, `setSelectionRange()`, or managing tabindex attributes.
   - **Why Use Refs**: Refs allow you to handle these interactions directly with the DOM, which is necessary for precise control over focus and selection behavior.

5. **Scrolling to Specific Positions**:
   - **Example**: Automatically scrolling to a specific section of a page in response to user actions or navigation.
   - **Imperative Code**: Using `scrollIntoView()` or calculating scroll positions based on viewport dimensions.
   - **Why Use Refs**: Refs allow you to access and manipulate scroll positions or trigger scrolling behavior directly on DOM elements.

### When to Use Refs vs. Props:

- **Refs** should be used when you need to perform imperative behaviors that involve direct DOM manipulation or interaction with external imperative APIs.
- **Props** are more suitable for passing data and callback functions between components in a declarative manner, maintaining encapsulation and promoting reusability.

In summary, using refs for imperative behaviors allows React components to interact with the browser environment in ways that go beyond the typical React data flow and component lifecycle. It provides a bridge between React's declarative approach and the imperative nature of certain browser operations and third-party libraries.
 
In React, the `useRef` hook is used to create a mutable ref object. This ref object can hold a reference to a DOM element or a value that persists across renders. 

### Key Characteristics of `useRef`:

1. **Creating Refs**: You create a ref using `useRef` by calling it with an initial value. This initial value can be `null` or any other value you want the ref to hold.

   ```jsx
   const myRef = useRef(initialValue);
   ```

2. **Mutable Reference**: Unlike state variables (`useState`), changing the `current` property of a ref object does not trigger a re-render. This property (`ref.current`) holds the current value of the ref.

   ```jsx
   myRef.current = newValue;
   ```

3. **Preservation Across Renders**: The value of `ref.current` persists between renders. This makes `useRef` useful for storing values that need to be accessed between renders without causing re-renders.

4. **DOM Node References**: `useRef` is commonly used to reference DOM elements directly. You can assign the ref to a JSX element and access its underlying DOM node through `ref.current`.

   ```jsx
   const myRef = useRef(null);

   return <div ref={myRef}>Example</div>;

   // Accessing the DOM node:
   myRef.current // => <div>Example</div>
   ```

5. **Other Use Cases**: Besides DOM elements, refs can be used to store any mutable value, such as previous state values, timers, or other imperative API handles that you want to preserve across renders.

### When to Use `useRef`:

- **Accessing DOM**: When you need to interact directly with a DOM element, such as focusing an input, scrolling to a specific position, or measuring its size.
  
- **Storing Mutable Values**: When you have a value that you want to persist across renders without causing re-renders, such as previous state values or values used in event handlers.

- **Optimizing Performance**: `useRef` can be used to store values that, if stored in state, would cause unnecessary re-renders. This is because changing the `current` property of a ref does not trigger a re-render.

### Example Usage:

```jsx
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => console.log(inputRef.current.value)}>
        Log Input Value
      </button>
    </div>
  );
};

export default MyComponent;
```

In this example:
- `inputRef` is created using `useRef` and assigned to the `<input>` element.
- `useEffect` is used to focus the input element when the component mounts (`[]` as dependency array ensures it runs only once).
- `inputRef.current.value` is used to access the current value of the input field without causing re-renders.

Overall, `useRef` is a versatile tool in React for managing mutable state that persists across renders and for interacting with DOM elements in a straightforward manner.


Yes, you can enhance the example using the `useImperativeHandle` hook in React. The `useImperativeHandle` hook allows you to expose certain methods or properties on a ref that are accessible from the parent component, providing more controlled access to the child component's instance.

Here’s how you can modify your example to use `useImperativeHandle`:

```jsx
import React, { forwardRef, useRef, useImperativeHandle, ForwardedRef } from "react";

// Define the props for InputComponent
interface InputProps {
  // You can define props for InputComponent here
}

// Interface for exposing methods/properties to parent
interface InputHandle {
  focusInput: () => void;
}

// Child component that will receive the ref
const InputComponent = forwardRef<ForwardedRef<InputHandle>, InputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose focusInput method to parent component
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }));

    return <input type="text" ref={inputRef} />;
  }
);

// Parent component that uses InputComponent
const ParentComponent = () => {
  // Create a ref using useRef hook
  const inputRef = useRef<InputHandle>(null);

  const focusInput = () => {
    // Access the focusInput method on the child component
    if (inputRef.current) {
      inputRef.current.focusInput();
    }
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <button onClick={focusInput}>Focus Input</button>
      <InputComponent ref={inputRef} />
    </div>
  );
};

export default ParentComponent;
```

### Benefits of `useImperativeHandle`:

1. **Controlled Exposures**: You can selectively expose methods or properties of the child component's instance to the parent. This means you can limit what parts of the child component's API are accessible to the parent, promoting encapsulation and better control over interactions.

2. **Improved Abstraction**: By using `useImperativeHandle`, you define an explicit contract (the `InputHandle` interface in this case) for what the parent component can do with the child component's instance. This makes your code more predictable and easier to reason about.

3. **Refactoring and Maintenance**: When your component API needs to change (e.g., adding or removing methods), you can easily update the `useImperativeHandle` implementation without affecting how the parent component interacts with it, as long as the exposed contract (`InputHandle` interface) remains consistent.

4. **Integration with External Libraries**: If you need to integrate React components with external libraries or imperative APIs that expect direct access to underlying DOM nodes or methods, `useImperativeHandle` allows you to bridge React's declarative approach with imperative requirements more cleanly.

In summary, `useImperativeHandle` is useful when you need more control over how a child component's instance is accessed and manipulated by its parent, providing a structured way to expose specific functionalities while maintaining encapsulation and abstraction principles in React applications.



*/
