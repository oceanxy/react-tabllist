# react-tabllist change log

---

#### 2.0.0[plan]
1. Add a panel for dynamically adjusting properties in the development environment.
2. New Function: A cell can bind multiple events.
3. Refactoring most of the old code.

#### 1.7.0[dev]
1. Update dependency package.
2. The configuration item adds the function of customizing the number of rolling laps.
3. Optimize the code logic related to scrolling, complete some comments, and modify some incorrect comments.
4. Improve the readability of some source code, such as variable naming.
5. Modify the className of the outermost container of the component to more recognizable and unique characters to avoid polluting other components or pages.

#### 1.6.1[latest]
This version has not updated features, only some field names and comments have been optimized. In addition, the version of the core dependency library has been updated, as well as some updates in the development mode. The details are as follows:

1. Remove yarn.lock and package-lock.json from .gitignore
2. Update the version of highlight.js in development mode. The version used before the update (v 9.15.6) has a vulnerability. In fact, the version before v 10.4.1 has this vulnerability
3. Update the version of the core dependency library
4. Optimized the parameter structure of the callback function exposed to the object unit (note that props can be re-assigned through the callback function of the object unit, and the component has been updated. This function has existed before, but it is not explained in the text)
5. Update the README.md file

#### 1.6.0
1. New object cell: input.
2. Optimization of generation rules for object cells. You can now add custom attributes, react-related HTML attributes, and HTML attributes specified by w3school in the configuration of the object cell to make the resulting tags more friendly.
3. Modify the description of the fields available in the object cell in the README.md file.

#### 1.5.1 `For some reason, v1.5.1 has disappeared! Don't panic, everything in v1.5.1 is included in v1.6.0. But I recommend using the latest version.`
1. Fix bug: when setting css property {border-collapse: 'collapse'}, 'border-spacing' is invalid because it is ignored.
2. Fix bug: Numeric parsing error when custom cell width value is 'avg' or multiple values separated by commas.
3. Fix bug: When deactivating list auto scrolling, you can't manually control the list to scroll to the specified row.
4. Fix bug: Callback functions for object cell {type: 'radio', ...} and {type: 'checkbox', ...} are not available. Note: This bug exists in all versions prior to version 1.5.1.
5. Optimize the parameter structure of the callback function.
6. Refactored part of the code.

#### 1.5.0
1. Customize the text of the header serial number.
2. Configuration item update: property.body.row.rowCheckbox is no longer set directly to a Boolean value, but an object.
3. Custom row selection box or row serial number inserted into which column of the list.
4. You can define partial styles of the body, which usually do not affect the layout of the list.
5. Body height changes with list height whenever.
6. Fix bug: When the row selection or row number feature is enabled, the columns in the header are misaligned with the columns in the body.
7. Refactoring the code logic for row hover effects.
8. Normal text can also be written as an object cell to increase the event.

#### 1.4.3
1. Modify the logic of scrolling.
2. The height calculation method of the scroll area is updated: the padding of the component and the width of the border are now subtracted.
3. Performance optimization: Pause component scrolling when switching to other tabbed pages in the browser.

#### 1.4.2
1. Fix default parameters of property.scroll, consistent with previous versions.

#### 1.4.1
1. Fix bug: when scrolling by row and scrolling to the last row, the component will stop scrolling.
2. New object cell: drop-down list.
3. Some methods of the component can be used to manipulate the component in the object cell's callback function. For example: `scrollTo(9)` can scroll the list to a row with index 9.
4. update README document.

#### 1.4.0
1. Integrate the original scrolling function related components of the component and add some new scrolling configuration. You can configure it in ‘property.scroll’.

#### 1.3.1
1. Fix bug: When obsolete properties are used, the program is terminated when the obsolete property and the new substitution property (if any) do not belong to the child of the same object.
2. Print outdated property warnings only in the development environment.

#### 1.3.0
1. Added a description of modifying the data structure in the readme file: a new way of writing about row. (This feature is already available in version 1.2.1, but not in the readme file)
2. Fix bug: jsx is invalid in data.
3. Rewrite button, radio, and checkbox custom events; Rewrite the logic of radio and checkbox.
4. Readme file can be switched to Chinese or English.
5. A warning will be printed on the console when using the obsolete property.

#### 1.2.1
1. Cancel the definition of the click event of the row in the property in the 1.2.0 version, instead of defining it in the data property, just like other object cells.

#### 1.2.0
1. Events can be added to rows, and previous versions can only add events to cells.
2. Fix bug: When the line number feature is enabled, the style of the row number cell is applied to all cells in the row.

#### 1.1.4
1. Added two examples to be applied to actual projects.
2. Use `webpack externals`: Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
3. Only publish useful files to npm

#### 1.1.3
1. Update the README document: Add 'img' to the object cell type. The 'img' type can also be used in previous versions, just to supplement the documentation.

#### 1.1.2
1. Display the specific configuration of each demo.

#### 1.1.1
1. Write configuration documents.

#### 1.1.0
1. Modify the configuration file structure.
2. The outermost container can customize the className property.

#### 1.0.11
1. Modify the CI configuration file.
2. optimize some of the code.

#### 1.0.10
1. Modify the error in the CI configuration file.
2. Write unit test cases.

#### 1.0.9
1. Complete WebPack development framework.
2. Add unit test.
3. add codecov.

#### 1.0.8
1. Adjust the frame structure, add examples and app directories, and improve the README.md file.

#### 1.0.7
[Unpublished] This version was released due to misoperation. This version has major flaws and has been withdrawn.

#### 1.0.6
1. Custom className attribute: The tags inside the cell (such as: button, a, input, etc.) can customize the className property.

#### 1.0.5
[beta] Start beta test.

#### 1.0.4
1. Fixed bug in post-compilation reference component error reporting.

#### 1.0.3
1. Data update animation.

#### 1.0.2
1. Cell click event.

#### 1.0.1
1. Row number.

#### 1.0.0
1. Cells can be customized to the following formats: checkbox, radio, link, and button.

#### 0.0.1
[alpha] Alpha test phase.
