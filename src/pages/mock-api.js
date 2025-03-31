// --- mock-api.js (or directly in the component for simplicity in MVP) ---

const MOCK_ROUTE_DATA = {
    success: true,
    data: {
      id: 'route-alpha-001',
      name: 'Alpha Assembly Line',
      nodes: [
        {
          id: 'start-node', // Unique ID
          name: '物料准备',
          description: '原材料或半成品入场',
          prevNodeId: null, // Starting node
          x: 100,          // Initial X coordinate
          y: 200           // Initial Y coordinate
        },
        {
          id: 'op-10',
          name: '工序 A',
          description: '初步加工',
          prevNodeId: 'start-node',
          x: 300,
          y: 100
        },
        {
          id: 'qa-10',
          name: '质检 A',
          description: '对工序A结果进行检验',
          prevNodeId: 'op-10',
          x: 500,
          y: 100
        },
         {
          id: 'op-20',
          name: '工序 B (并行)',
          description: '与工序A并行处理',
          prevNodeId: 'start-node', // Also starts after 'start-node'
          x: 300,
          y: 300
        },
         {
          id: 'op-30',
          name: '工序 C',
          description: '合并或后续处理',
          prevNodeId: 'qa-10', // Follows QA A
          x: 700,
          y: 200 // Positioned centrally after parallel paths merge conceptually
        },
         {
          id: 'end-node',
          name: '成品入库',
          description: '完成品',
          prevNodeId: 'op-30',
          x: 900,
          y: 200
        }
      ]
    }
  };
  
  // Simulate API call
  function mockFetchProcessRoute(routeId) {
    console.log(`Mock API: Fetching route ${routeId}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real scenario, you might check routeId
        console.log("Mock API: Responding with data.");
        resolve(MOCK_ROUTE_DATA); // Always return the same mock data for MVP
      }, 800); // Simulate network delay
    });
  }
  
  // Simulate Save API call
  function mockSaveProcessRoute(routeData) {
      console.log(`Mock API: Saving route...`, routeData);
      return new Promise((resolve) => {
          setTimeout(() => {
              console.log("Mock API: Save successful (simulated).");
              // Simulate returning the saved data or just success status
              resolve({ success: true, savedData: routeData });
          }, 1000);
      });
  }
  
  export { mockFetchProcessRoute, mockSaveProcessRoute };