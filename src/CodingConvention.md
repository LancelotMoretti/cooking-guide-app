# Coding Convention
### Function

```typescript
export function name() {
    // Code
    return (
        // Code
    );
}
```

### Function with Parameters

```typescript
interface InterfaceName {
    param1: string;
    param2: number;
}

export function name(param1: string, param2: number) {
    // Code
    return (
        // Code
    );
}
```

### Component

```typescript
const Name: React.FC = () => {
    // Code
    return (
        // Code
    );
}

export default Name;
```
or if you have multiple components (that are related) in a single file, you can export them as follows:
```typescript
const Name1: React.FC = () => {
    // Code
    return (
        // Code
    );
}

const Name2: React.FC = () => {
    // Code
    return (
        // Code
    );
}

export { Name1, Name2 };
```

### Component with Props

```typescript
interface InterfaceName {
    prop1: string;
    prop2: number;
}

const Name: React.FC<InterfaceName> = ({ prop1, prop2 }) => {
    // Code
    return (
        // Code
    );
}

export default Name;
```
or if you have multiple components (that are related) in a single file, you can export them as follows:
```typescript
interface InterfaceName1 {
    prop1: string;
    prop2: number;
}

const Name1: React.FC<InterfaceName> = ({ prop1, prop2 }) => {
    // Code
    return (
        // Code
    );
}

interface InterfaceName2 {
    prop1: string;
    prop2: number;
}

const Name2: React.FC<InterfaceName> = ({ prop1, prop2 }) => {
    // Code
    return (
        // Code
    );
}

export { Name1, Name2 };
```

### Services (Backend API Calls)

```typescript
export const name = async (param1: string, param2: number) => {
    // Code
    return (
        // Code
    );
};

export const name = (param1: string, param2: number) => {
    // Code
    return (
        // Code
    );
};
```

### Styles

- Styles should be defined in a file within a `constants` folder with a descriptive name.
- Example: `Header.ts`

```typescript
import { TextStyle } from 'react-native';

export const LoginHeader: TextStyle = {
    marginTop: 55,
    textAlign: 'center',
    color: '#4C7D74',
    fontSize: 25,
    fontWeight: 'bold'
};
```
- The above example also applied to styles = {{...}} in `<View></View>` or `<Text></Text>`.

### Example Directory Structure

```
src/
  components/
    NameComponent.tsx
  constants/
    Header.ts
  hooks/
    utilityFunctions.ts
```

### Explanation

1. **Function and Function with Parameters:**
   - Functions should use camelCase.
   - Parameters should match the defined interface.

2. **Component and Component with Props:**
   - Use PascalCase for component names.
   - Use `React.FC` for functional components and provide the props interface.
   - The interface should be descriptive and use PascalCase.

3. **Styles:**
   - Define styles in a separate file within the `constants` folder.
   - Name the file descriptively to indicate its purpose (e.g., `Header.ts` for header styles).
   - Use TypeScript types like `TextStyle` from `react-native` to define styles.

This structure helps maintain a clean and organized codebase, making it easier to manage and scale your project.