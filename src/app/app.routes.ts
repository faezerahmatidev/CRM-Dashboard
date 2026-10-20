import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then((m) => m.Signup) },
  { path: 'signin', loadComponent: () => import('./auth/signin/signin').then((m) => m.Signin) },
  { path: 'recover', loadComponent: () => import('./auth/recover/recover').then((m) => m.Recover) },
  { path: 'finish', loadComponent: () => import('./auth/finish/finish').then((m) => m.Finish) },
  { path: 'details', loadComponent: () => import('./auth/details/details').then((m) => m.Details) },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./dashboard/sales/sales').then((m) => m.DashSales),
      },
      {
        path: 'overview',
        loadComponent: () => import('./dashboard/overview/overview').then((m) => m.DashOverview),
      },
      {
        path: 'orders',
        loadComponent: () => import('./dashboard/orders/orders').then((m) => m.DashOrders),
      },
      {
        path: 'messages',
        loadComponent: () => import('./dashboard/empty/empty').then((m) => m.DashEmpty),
      },
    ],
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/projects-layout/projects-layout').then((m) => m.ProjectsLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-01' },
      {
        path: 'empty',
        loadComponent: () => import('./projects/empty/empty').then((m) => m.ProjectsEmpty),
        data: { title: 'Projects' },
      },
      {
        path: 'list-01',
        loadComponent: () => import('./projects/list-01/list-01').then((m) => m.ProjectsList01),
        data: { title: 'Projects' },
      },
      {
        path: 'grid-01',
        loadComponent: () => import('./projects/grid-01/grid-01').then((m) => m.ProjectsGrid01),
        data: { title: 'Projects' },
      },
      {
        path: 'details/tasks',
        loadComponent: () => import('./projects/details/tasks/tasks').then((m) => m.ProjectTasks),
        data: { title: 'Project Details' },
      },
      {
        path: 'details/desk',
        loadComponent: () => import('./projects/details/desk/desk').then((m) => m.ProjectDesk),
        data: { title: 'Project Details' },
      },
      {
        path: 'details/activity',
        loadComponent: () =>
          import('./projects/details/activity/activity').then((m) => m.ProjectActivity),
        data: { title: 'Project Details' },
      },
      {
        path: 'details/files',
        loadComponent: () => import('./projects/details/files/files').then((m) => m.ProjectFiles),
        data: { title: 'Project Details' },
      },
      {
        path: 'details/reports',
        loadComponent: () =>
          import('./projects/details/reports/reports').then((m) => m.ProjectReports),
        data: { title: 'Project Details' },
      },
      {
        path: 'details/settings',
        loadComponent: () =>
          import('./projects/details/settings/settings').then((m) => m.ProjectSettings),
        data: { title: 'Project Details' },
      },
    ],
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/tasks-layout').then((m) => m.TasksLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-01' },
      {
        path: 'empty',
        loadComponent: () => import('./tasks/empty/empty').then((m) => m.TasksEmpty),
        data: { title: 'Tasks' },
      },
      {
        path: 'list-01',
        loadComponent: () => import('./tasks/list-01/list-01').then((m) => m.TasksList01),
        data: { title: 'Tasks' },
      },
    ],
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./kanban/kanban-layout').then((m) => m.KanbanLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'desk' },
      {
        path: 'empty',
        loadComponent: () => import('./kanban/empty/empty').then((m) => m.KanbanEmpty),
        data: { title: 'Kanban Desk' },
      },
      {
        path: 'desk',
        loadComponent: () => import('./kanban/desk/desk').then((m) => m.KanbanDesk),
        data: { title: 'Kanban Desk' },
      },
    ],
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./calendar/calendar-layout').then((m) => m.CalendarLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'month' },
      {
        path: 'month',
        loadComponent: () => import('./calendar/month/month').then((m) => m.CalMonth),
        data: { title: 'Calendar' },
      },
      {
        path: 'week',
        loadComponent: () => import('./calendar/week/week').then((m) => m.CalWeek),
        data: { title: 'Calendar' },
      },
      {
        path: 'day',
        loadComponent: () => import('./calendar/day/day').then((m) => m.CalDay),
        data: { title: 'Calendar' },
      },
    ],
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./contacts/contacts-layout').then((m) => m.ContactsLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-01' },
      {
        path: 'empty',
        loadComponent: () => import('./contacts/empty/empty').then((m) => m.ContactsEmpty),
        data: { title: 'Contacts' },
      },
      {
        path: 'list-01',
        loadComponent: () => import('./contacts/list-01/list-01').then((m) => m.ContactsList01),
        data: { title: 'Contacts' },
      },
      {
        path: 'list-02',
        loadComponent: () => import('./contacts/list-02/list-02').then((m) => m.ContactsList02),
        data: { title: 'Contacts' },
      },
      {
        path: 'list-03',
        loadComponent: () => import('./contacts/list-03/list-03').then((m) => m.ContactsList03),
        data: { title: 'Contacts' },
      },
      {
        path: 'grid-01',
        loadComponent: () => import('./contacts/grid-01/grid-01').then((m) => m.ContactsGrid01),
        data: { title: 'Contacts' },
      },
      {
        path: 'grid-02',
        loadComponent: () => import('./contacts/grid-02/grid-02').then((m) => m.ContactsGrid02),
        data: { title: 'Contacts' },
      },
      {
        path: 'grid-03',
        loadComponent: () => import('./contacts/grid-03/grid-03').then((m) => m.ContactsGrid03),
        data: { title: 'Contacts' },
      },
      {
        path: 'profile/overview',
        loadComponent: () =>
          import('./contacts/profile/overview/overview').then((m) => m.ProfileOverview),
        data: { title: 'Profile Overview' },
      },
      {
        path: 'profile/sales',
        loadComponent: () => import('./contacts/profile/sales/sales').then((m) => m.ProfileSales),
        data: { title: 'Profile Overview' },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./contacts/settings/settings-layout').then((m) => m.ContactSettings),
        data: { title: 'Account Settings' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'general' },
          {
            path: 'general',
            loadComponent: () =>
              import('./contacts/settings/settings-tabs').then((m) => m.SettingsGeneral),
          },
          {
            path: 'accounts',
            loadComponent: () =>
              import('./contacts/settings/settings-tabs').then((m) => m.SettingsAccounts),
          },
          {
            path: 'security',
            loadComponent: () =>
              import('./contacts/settings/settings-tabs').then((m) => m.SettingsSecurity),
          },
          {
            path: 'billing',
            loadComponent: () =>
              import('./contacts/settings/settings-tabs').then((m) => m.SettingsBilling),
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import('./contacts/settings/settings-tabs').then((m) => m.SettingsNotifications),
          },
        ],
      },
    ],
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./messages/messages-layout').then((m) => m.MessagesLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'empty',
        loadComponent: () => import('./messages/empty/empty').then((m) => m.MessagesEmpty),
        data: { title: 'Messages' },
      },
      {
        path: 'list',
        loadComponent: () => import('./messages/list/list').then((m) => m.MessagesList),
        data: { title: 'Messages' },
      },
      {
        path: 'conversation',
        loadComponent: () =>
          import('./messages/conversation/conversation').then((m) => m.MessagesConversation),
        data: { title: 'Messages' },
      },
      {
        path: 'media',
        loadComponent: () => import('./messages/media/media').then((m) => m.MessagesMedia),
        data: { title: 'Messages' },
      },
      {
        path: 'about',
        loadComponent: () => import('./messages/about/about').then((m) => m.MessagesAbout),
        data: { title: 'Messages' },
      },
    ],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products-layout').then((m) => m.ProductsLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list-01' },
      {
        path: 'empty',
        loadComponent: () => import('./products/empty/empty').then((m) => m.ProductsEmpty),
        data: { title: 'Products' },
      },
      {
        path: 'list-01',
        loadComponent: () => import('./products/list-01/list-01').then((m) => m.ProductsList01),
        data: { title: 'Products' },
      },
      {
        path: 'grid-01',
        loadComponent: () => import('./products/grid-01/grid-01').then((m) => m.ProductsGrid01),
        data: { title: 'Products' },
      },
      {
        path: 'list-02',
        loadComponent: () => import('./products/list-02/list-02').then((m) => m.ProductsList02),
        data: { title: 'Products' },
      },
      {
        path: 'grid-02',
        loadComponent: () => import('./products/grid-02/grid-02').then((m) => m.ProductsGrid02),
        data: { title: 'Products' },
      },
      {
        path: 'item/overview',
        loadComponent: () =>
          import('./products/item/overview/overview').then((m) => m.ItemOverview),
        data: { title: 'Item Overview' },
      },
      {
        path: 'item/settings',
        loadComponent: () =>
          import('./products/item/settings/settings-layout').then((m) => m.ItemSettings),
        data: { title: 'Item Settings' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'general' },
          {
            path: 'general',
            loadComponent: () =>
              import('./products/item/settings/settings-tabs').then((m) => m.ProductSettingsGeneral),
          },
          {
            path: 'description',
            loadComponent: () =>
              import('./products/item/settings/settings-tabs').then((m) => m.ProductSettingsDescription),
          },
          {
            path: 'shipping',
            loadComponent: () =>
              import('./products/item/settings/settings-tabs').then((m) => m.ProductSettingsShipping),
          },
          {
            path: 'discount',
            loadComponent: () =>
              import('./products/item/settings/settings-tabs').then((m) => m.ProductSettingsDiscount),
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import('./products/item/settings/settings-tabs').then((m) => m.ProductSettingsNotifications),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'signin' },
];
