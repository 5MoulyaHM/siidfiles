import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class SidebarNavigation extends NavigationMixin(LightningElement) {
    @track menuItems = [
        {
            id: 'attendance',
            label: 'Attendance',
            icon: 'standard:scheduling_workspace',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            link: '/attendance',
            subItems: null
        },
        {
            id: 'timesheet',
            label: 'Timesheet',
            icon: 'standard:timesheet',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'ts-all', label: 'All Timesheet', link: '/timesheet/all' },
                { id: 'ts-pastdue', label: 'Past Due', link: '/timesheet/pastdue', badge: '3' },
                { id: 'ts-rejected', label: 'Rejected Timesheets', link: '/timesheet/rejected' },
                { id: 'ts-project', label: 'Project Time', link: '/timesheet/project' },
                { id: 'ts-summary', label: 'Time Summary', link: '/timesheet/summary' },
                { id: 'ts-tasks', label: 'My Tasks', link: '/timesheet/tasks' },
                { id: 'ts-projects', label: 'Projects Allocated', link: '/timesheet/projects' }
            ]
        },
        {
            id: 'leave',
            label: 'Leave',
            icon: 'standard:event',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'leave-apply', label: 'Apply Leave', link: '/leave/apply' },
                { id: 'leave-history', label: 'Leave History', link: '/leave/history' },
                { id: 'leave-balance', label: 'Leave Balance', link: '/leave/balance' },
                { id: 'leave-calendar', label: 'Leave Calendar', link: '/leave/calendar' }
            ]
        },
        {
            id: 'performance',
            label: 'Performance',
            icon: 'standard:performance',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'perf-review', label: 'My Reviews', link: '/performance/reviews' },
                { id: 'perf-goals', label: 'Goals', link: '/performance/goals' },
                { id: 'perf-feedback', label: 'Feedback', link: '/performance/feedback' }
            ]
        },
        {
            id: 'expenses',
            label: 'Expenses & Travel',
            icon: 'standard:account',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'exp-submit', label: 'Submit Expense', link: '/expenses/submit' },
                { id: 'exp-pending', label: 'Pending Expenses', link: '/expenses/pending' },
                { id: 'exp-travel', label: 'Travel Requests', link: '/expenses/travel' }
            ]
        },
        {
            id: 'helpdesk',
            label: 'Helpdesk',
            icon: 'standard:service_crew',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'help-tickets', label: 'My Tickets', link: '/helpdesk/tickets' },
                { id: 'help-new', label: 'Create Ticket', link: '/helpdesk/new' },
                { id: 'help-kb', label: 'Knowledge Base', link: '/helpdesk/kb' }
            ]
        },
        {
            id: 'apps',
            label: 'Apps',
            icon: 'standard:apps',
            isExpanded: false,
            expandIcon: 'utility:chevronright',
            cssClass: 'menu-item',
            subItems: [
                { id: 'app-all', label: 'All Apps', link: '/apps/all' },
                { id: 'app-fav', label: 'Favorites', link: '/apps/favorites' }
            ]
        }
    ];

    handleMenuClick(event) {
        const menuId = event.currentTarget.dataset.id;
        const menuItem = this.menuItems.find(item => item.id === menuId);
        
        if (menuItem && menuItem.subItems) {
            // Toggle expansion
            this.menuItems = this.menuItems.map(item => {
                if (item.id === menuId) {
                    return {
                        ...item,
                        isExpanded: !item.isExpanded,
                        expandIcon: !item.isExpanded ? 'utility:chevrondown' : 'utility:chevronright',
                        cssClass: !item.isExpanded ? 'menu-item active' : 'menu-item'
                    };
                }
                return item;
            });
        } else if (menuItem && menuItem.link) {
            // Navigate to the page
            this.navigateToPage(menuItem.link);
        }
    }

    handleSubItemClick(event) {
        event.stopPropagation();
        const link = event.currentTarget.dataset.link;
        this.navigateToPage(link);
    }

    navigateToPage(link) {
        // For Experience Cloud - use navigation service
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: link
            }
        });
        
        // Alternative: Direct navigation for custom pages
        // window.location.href = link;
    }
}