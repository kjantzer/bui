/*
    # App Shell

    App layout where navigation lives in a full height sidebar and every link opens a panel

    ```html
    <b-panels name="root">
        <b-app-sidebar slot="left">...</b-app-sidebar>
        <b-app-topbar slot="main-top">...</b-app-topbar>
        <my-home slot="base"></my-home> <!-- extends bui/app/shell/view -->
    </b-panels>
    ```

    - desktop: sidebar (collapses to an icon rail) | topbar above the content; panels open in the content column
    - under 1200px: icon rail; expanding overlays the content
    - phones (under 700px): topbar with ☰ that opens the sidebar as a drawer; panels are full screen

    See sidebar.js, item.js, group.js, open-panels.js, topbar.js and view.js
*/
import './sidebar'
import './item'
import './group'
import './topbar'
export {default as AppSidebarOpenPanels} from './open-panels'
export {default as AppShellView} from './view'
