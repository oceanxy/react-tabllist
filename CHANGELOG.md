# react-tabllist change log

---

### Alpha

#### 0.0.1 Alpha

#### 1.0.0 
1. Cells can be customized to the following formats: checkbox, radio, link, and button.

#### 1.0.1 
1. Row number.

#### 1.0.2 
1. Cell click event.

#### 1.0.3 
1. Data update animation.

#### 1.0.4 
1. Fixed bug in post-compilation reference component error reporting.

### Beta

#### 1.0.5 beta

#### 1.0.6 
1. Custom className attribute: The tags inside the cell (such as: button, a, input, etc.) can customize the className property.

#### 1.0.7 [Unpublished]

#### 1.0.8 
1. Adjust the frame structure, add examples and app directories, and improve the README.md file.

#### 1.0.9 
1. Complete WebPack development framework
2. Add unit test
3. add codecov

#### 1.0.10 
1. Modify the error in the CI configuration file.
2. Write unit test cases.

#### 1.0.11 
1. Modify the CI configuration file.
2. optimize some of the code.

#### 1.1.0 
1. Modify the configuration file structure.
2. The outermost container can customize the className property.

#### 1.1.1 
1. Write configuration documents.

#### 1.1.2 
1. Display the specific configuration of each demo.

#### 1.1.3 
1. Update the README document: Add 'img' to the object cell type. The 'img' type can also be used in previous versions, just to supplement the documentation.

#### 1.1.4 
1. Added two examples to be applied to actual projects.
2. Use `webpack externals`: Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
3. Only publish useful files to npm

#### 1.2.0
1. Events can be added to rows, and previous versions can only add events to cells.
2. Fix bug: When the line number feature is enabled, the style of the row number cell is applied to all cells in the row.
