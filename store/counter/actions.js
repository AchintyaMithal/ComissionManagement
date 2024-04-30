
import commissionsData from '../../assets/data.json';

// actions.js
export default {
  
  
  deleteCommission({ commit }, id) {
    
    commit('DELETE_COMMISSION', id);
  },
  updateComission({commit}, comisson){
    commit('UPDATE_COMMISSIONS',comisson);
  },
  saveDraft({commit},comisson){
    commit('SAVE_COMMISSIONS', comisson);

  },

  async fetchCommissions({ commit }) {
    try {
      // Attempt to load commissions data from local storage
      const storedCommissions = localStorage.getItem('commissions');
      if (storedCommissions) {
        commit('SET_COMMISSIONS', JSON.parse(storedCommissions));
      } else {
        // If no data in local storage, fetch from JSON file
        const response = commissionsData;
       
        // Commit mutations to update the commissions state
        commit('SET_COMMISSIONS', response);
      }
    } catch (error) {
      console.error('Error fetching commissions:', error);
    }
  },
};
