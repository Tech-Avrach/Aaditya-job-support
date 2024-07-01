
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
    content: [
      {
        label: "Add",
        to: "/dispute/add",
      },
      {
        label: "List",
        to: "/dispute/list",
      },
    ],
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
  {
    icon: "pe-7s-display2",
    label: "Rules and Regulations",
    content: [
      {
        label: "Add",
        to: "/rules/add",
      },
      {
        label: "List",
        to: "/rules/list",
      },
    ],
  },
  {
    icon: "pe-7s-comment",
    label: "FAQ",
    content: [
      {
        label: "Add",
        to: "/faq/add",
      },
      {
        label: "List",
        to: "/faq/list",
      },
    ],
  },
  {
    icon: "pe-7s-photo",
    label: "Banner",
    content: [
      {
        label: "Add",
        to: "/banner/add",
      },
      {
        label: "List",
        to: "/banner/list",
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
    case 19: return {
      icon: "pe-7s-display2",
      label: "Rules and Regulations",
      content: [
        {
          label: "Add",
          to: "/rules/add",
        },
        {
          label: "List",
          to: "/rules/list",
        },
      ],
    }

    case 5: return {
      icon: "pe-7s-comment",
      label: "FAQ",
      content: [
        {
          label: "Add",
          to: "/faq/add",
        },
        {
          label: "List",
          to: "/faq/list",
        },
      ],
    }

    case 18: return {
      icon: "pe-7s-comment",
      label: "banner",
      content: [
        {
          label: "Add",
          to: "/banner/add",
        },
        {
          label: "List",
          to: "/banner/list",
        },
      ],
    }
    
    default: return null;
  }

}

export const createNavItems = (permissions) => {
  if (!Array.isArray(permissions)) return [];

  return permissions.reduce((navItems, { moduleId, read, create }) => {
    if (read !== 1) return navItems; 

    const navItem = getNavItem(moduleId);
    if (!navItem) return navItems; 

    if (create === 0 && navItem.content) {
      navItem.content = navItem.content.filter(item => item.label !== "Add");
    }

    navItems.push(navItem); 
    return navItems; 
  }, []); 
};


// export const createNavItems = (permission) => {
//   let modules = permission?.map(e => ({ moduleId: e.moduleId, readPermission: e.read, createPermission: e.create }));
//   let navItems = []
//   console.log(permission);
//   modules?.forEach(e => {
//     if(e.readPermission === 1) {
//       let ni = getNavItem(e.moduleId)
//       if(e.createPermission === 0){
//         // i want to remove object with add label in content from ni
//       }
    
//       if(ni) navItems.push(ni)

//     }
//   })

//   return navItems
// }



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