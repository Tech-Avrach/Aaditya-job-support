export const AdminNav = [
  {
    icon: "pe-7s-graph2",
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: "pe-7s-users",
    label: "Users",
    content: [
      {
        label: "Add",
        to: "/user/add",
      },
      {
        label: "List",
        to: "/user/list",
      },
    ],
  },
  {
    icon: "pe-7s-shopbag",
    label: "Seller",
    to: "/seller/list",
  },

  {
    icon: "pe-7s-cart",
    label: "Orders",
    to: "/order/list",
  },

  {
    icon: "pe-7s-display2",
    label: "Games Ads",
    content: [
      {
        label: "Add",
        to: "/games/add",
      },
      {
        label: "List",
        to: "/games/list",
      },
    ],
  },
  {
    icon: "pe-7s-help2",
    label: "Dispute",
    to: "/dispute/list",
  },
  {
    icon: "pe-7s-network",
    label: "Role Permission",
    content: [
      {
        label: "Roles",
        to: "/role/list",
      },
      {
        label: "Permission",
        to: "/role/permission",
      },
    ],
  },
];

const getNavItem = (moduleId) => {

  switch(moduleId) {
    case 1: return ({
      icon: "pe-7s-users",
      label: "Users",
      content: [
        {
          label: "Add",
          to: "/user/add",
        },
        {
          label: "List",
          to: "/user/list",
        },
      ],
    })
    case 2: return {
      icon: "pe-7s-shopbag",
      label: "Seller",
      to: "/seller/list",
    }
    case 7: return {
      icon: "pe-7s-help2",
      label: "Dispute",
      to: "/dispute/list",
    }
    case 8: return {
      icon: "pe-7s-display2",
      label: "Games Ads",
      content: [
        {
          label: "Add",
          to: "/games/add",
        },
        {
          label: "List",
          to: "/games/list",
        },
      ],
    }
    default: return null;
  }

}

export const createNavItems = (permission) => {
  let modules = permission?.map(e => e.moduleId)
  let navItems = []
  modules?.forEach(e => {
    let ni = getNavItem(e)
    if(ni) navItems.push(ni)
  })

  return navItems
}

export const CSRNav = [
  {
    icon: "pe-7s-graph2",
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: "pe-7s-users",
    label: "Users",
    content: [
      {
        label: "Add",
        to: "/user/add",
      },
      {
        label: "List",
        to: "/user/list",
      },
    ],
  },
  {
    icon: "pe-7s-shopbag",
    label: "Seller",
    to: "/seller/list",
  },

  {
    icon: "pe-7s-display2",
    label: "Games Ads",
    content: [
      {
        label: "Add",
        to: "/games/add",
      },
      {
        label: "List",
        to: "/games/list",
      },
    ],
  },
  {
    icon: "pe-7s-help2",
    label: "Dispute",
    to: "/dispute/list",
  },
];
