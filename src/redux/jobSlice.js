import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [], //10
  filtredJobs: [], // 2
  initialized: false,
};

const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      // We send data from the API to both the original and the copy array.
      state.jobs = action.payload;
      state.filtredJobs = action.payload;
      state.initialized = true;
    },
    addNewJob: (state, action) => {
      state.jobs.unshift(action.payload);
    },
    // state filter
    filterByStatus: (state, action) => {
      // We created a new array with elements equal to the payload value of the action and the status value.
      const filtredJobs = state.jobs.filter(
        (job) => job.status === action.payload
      );
      // copy array 
      state.filtredJobs = filtredJobs;
    },
    // type fiter
    filterByType: (state, action) => {
      // Create a new array with the objects with the type value that comes with the action.
      const filtredArr = state.jobs.filter(
        (job) => job.type === action.payload
      );
      //set the new string as the string printed on the screen.
      state.filtredJobs = filtredArr;
    },
    // Filter by input
    handleSearch: (state, action) => {
     
      const query = action.payload.toLowerCase();

      // new array create
      const filtredArr = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
  
      state.filtredJobs = filtredArr;
    },

    // Sort by
    sortState: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.filtredJobs.sort((a, b) => {
          
            if (a.company < b.company) return -1;
            if (a.company > b.company) return 1;
            return 0;
          });

          break;
        // Z - A sort
        case 'z-a':
          state.filtredJobs.sort((a, b) => {
            if (a.company < b.company) return 1;
            if (a.company > b.company) return -1;
            return 0;});
          break;
       /*
             What to do when sorting by date values:
             First, convert the string date value into a js date object
             - old version = "10/1/2023"
             - new version = 1231453827573
             - then the process of removing the skin between values
             - sort method will put the larger number higher in the array
           */
        case 'latest':
          state.filtredJobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case 'oldest ':
          state.filtredJobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        default:
          break;
      }
    },

    //Resets the filtered array.
    handleClear: (state, action) => {state.filtredJobs = state.jobs; },
  },
});

export const {
  setJobs,
  addNewJob,
  filterByStatus,
  filterByType,
  handleSearch,
  sortState,
  handleClear,
} = jobSlice.actions;

export default jobSlice.reducer;