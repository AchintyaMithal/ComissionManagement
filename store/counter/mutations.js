// mutations.js
export default {
  
  SET_COMMISSIONS(state, commissions) {
    state.comisson = commissions;
  },
  SAVE_COMMISSIONS(state, commissions) {
    state.comisson.push(commissions);
    localStorage.setItem('commissions', JSON.stringify(state.comisson));

  },
  
  DELETE_COMMISSION(state, id) {
    state.comisson = state.comisson.filter(commission => commission.id !== id);
    localStorage.setItem('commissions', JSON.stringify(state.comisson));
  },
  UPDATE_COMMISSIONS(state, commission) {
    const index = state.comisson.findIndex(a => a.id === commission.id);
    if (index !== -1) {
      state.comisson[index] = commission;
    }
    localStorage.setItem('commissions', JSON.stringify(state.comisson));

  },
  LOAD_COMMISSIONS(state, commissions) {
    state.comisson = commissions;
  },
  ADD_COMMISSION(state, newCommission) {
    state.comisson.push(newCommission);
  }
};

