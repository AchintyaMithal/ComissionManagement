<template>
  <v-container class="commission-container">
    <!-- Tabs -->
    <v-tabs v-model="selectedTab" background-color="#f5f5f5">
      <!-- Render tabs for each status -->
      <v-tab v-for="(status, index) in statuses" :key="index" :href="'#tab-' + status.toLowerCase()">
        {{ getStatusLabel(status) }}<span v-if="status !== 'ALL' && hasCount(status)"> ({{ getCount(status) }})</span>
      </v-tab>

      <!-- Tab content -->
      <v-tab-item v-for="(status, index) in statuses" :key="index" :value="'tab-' + status.toLowerCase()">
        <v-row v-if="filteredCommissionsByStatus(status).length > 0" justify="center">
          <v-col>
            <!-- Search Bar -->
            <v-text-field style="max-width: 80%; padding-left: 2%;" col-2 v-model="searchId" @input="searchCommission" placeholder="Search by ID"></v-text-field>

            <!-- Table Header -->
            <v-col>
              <v-card class="mb-5">
                <v-card-text>
                  <v-row style="flex-wrap: nowrap;">
                    <v-col>ID</v-col>
                    <v-col>Status</v-col>
                    <v-col>Type</v-col>
                    <v-col>Product</v-col>
                    <v-col>Model</v-col>
                    <v-col>Serial No</v-col>
                    <v-col>Planned Date</v-col>
                    <v-col>Customer</v-col>
                    <v-col>Actions</v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Commission Cards -->
            <v-col>
              <v-card v-for="commission in filteredCommissionsByStatus(status)" :key="commission.id" class="mb-5">
                <v-card-text>
                  <v-row style="flex-wrap: nowrap;">
                    <v-col><nuxt-link :to="{ name: 'comissionDetail', params: { id: commission }, props: { commission } }" @click.prevent>{{ commission.id }}</nuxt-link></v-col>
                    <v-col>{{ commission.status }}</v-col>
                    <v-col>{{ commission.type }}</v-col>
                    <v-col>{{ commission.product }}</v-col>
                    <v-col>{{ commission.model }}</v-col>
                    <v-col>{{ commission.serialNumber }}</v-col>
                    <v-col>{{ commission.plannedDate }}</v-col>
                    <v-col>{{ commission.customerId }}</v-col>
                    <v-col>
                      <button @click="editCommission(commission)" class="mr-2" color="info" dark>
                        <v-icon>mdi-pencil</v-icon>
                      </button>
                      <button @click="deleteCommission(commission.id)" color="error" dark>
                        <v-icon>mdi-delete</v-icon>
                      </button>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
        <v-row v-else>
          <!-- Search Bar -->
          <v-text-field col-2 style="max-width: 80%; padding-left: 2%;" v-model="searchId" @input="searchCommission" placeholder="Search by ID"></v-text-field>

          <!-- Empty message when no commissions found -->
          <v-col cols="12" class="empty-message">No commissions found.</v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>

    <!-- Add New Commission Button -->
    <v-btn class="add-commission" color="primary" @click="$router.push('/comission-add')">Add New Commission</v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchId: "",
      selectedTab: "tab-all",
      statuses: ["ALL", "OPEN", "IN-PROGRESS", "CLOSED", "CANCELED", "ON HOLD"]
    };
  },
  created() {
    this.initializeCommissions();
  },
  computed: {
    ...mapGetters({
      theCommission: "counter/getCommission"
    }),
    // Filter commissions based on search query
    filteredCommissions() {
      let filtered = this.theCommission;
      if (this.searchId.trim() !== "") {
        const searchId = parseInt(this.searchId.trim());
        filtered = filtered.filter(commission => commission.id === searchId);
      }
      return filtered;
    }
  },
  methods: {
    ...mapActions("counter", ["fetchCommissions", "deleteCommission"]),
    // Fetch commissions when component is created
    initializeCommissions() {
      this.fetchCommissions();
    },
    // Search commissions based on search query and selected tab
    searchCommission() {
      this.$router.push({ query: { status: this.selectedTab === "tab-all" ? undefined : this.selectedTab.replace("tab-", ""), searchId: this.searchId } });
    },
    // Get label for each status
    getStatusLabel(status) {
      switch (status) {
        case 'OPEN':
          return 'Open';
        case 'IN-PROGRESS':
          return 'In Progress';
        case 'CLOSED':
          return 'Closed';
        case 'CANCELED':
          return 'Canceled';
        case 'ON HOLD':
          return 'On Hold';
        default:
          return 'All';
      }
    },
    // Get count of commissions based on status
    getCount(status) {
      if (!status || status === "ALL") {
        return this.theCommission.length;
      } else {
        return this.theCommission.filter(commission => commission.status.toLowerCase() === status.toLowerCase()).length;
      }
    },
    // Check if there are commissions with the specified status
    hasCount(status) {
      return this.getCount(status) > 0;
    },
    // Filter commissions by status
    filteredCommissionsByStatus(status) {
      return this.filteredCommissions.filter(commission => status === "ALL" || commission.status.toLowerCase() === status.toLowerCase());
    },
    // Navigate to edit commission page
    editCommission(commission) {
      this.$router.push({ name: "comission-add", params: { id: commission } });
    }
  }
};
</script>

<style scoped>
.commission-container {
  padding: 20px;
  background-color: #f0f0f0;
}

.empty-message {
  margin-top: 20px;
  text-align: center;
  color: #888;
}

.add-commission {
  margin-top: 20px;
}

.v-btn {
  color: #fff !important;
}
</style>
