<template>
  <div class="modal fade" id="deleteDemand" tabindex="-1" aria-labelledby="deleteDemand" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Möchtest du den Eintrag wirklich löschen?
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-primary" @click="deleteDemand(demandId)" data-bs-dismiss="modal">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DemandDeleteModal",
  props:['demandDeleteId'],
  data() {
    return {
      demandId: this.demandDeleteId,
      deleteDemandArray: []
    }
  },
  computed: {
    ...mapGetters(['getDemandDelete'])
  },
  watch: {
    demandDeleteId: function(id) {
      this.demandId = id;
    },
    getDemandDelete() {
      this.$parent.loadDemand();
    }
  },
  methods: {
    ...mapActions(['deleteDemandEntry']),
    deleteDemand(id) {
      this.deleteDemandEntry(id);
    }
  }
}
</script>

<style scoped>
.btn-close {
  background-color: transparent;
  border: none;
}
.btn {
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 15px 40px;
}
.btn-secondary {
  padding: 5px;
  font-size: 12px;
  background-color: #a21d21;
}

.btn-default {
  border: 1px solid #a21d21;
}

.btn-primary {
  padding: 15px 40px;
  font-size: 16px;
  background-color: #a21d21;
}
</style>