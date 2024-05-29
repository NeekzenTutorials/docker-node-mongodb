import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'resourceModal',
  state: () => ({
    show: '',
    teacher_id: '',
  }),
  actions: {
    showModal(modal: string) {
      this.show = modal
    },
    hideModal(modal: string) {
      if (this.show === modal) {
        this.show = ''
      }
    },
    setTeacherId(id: string) {
      this.teacher_id = id
    },
    resetTeacherId() {
      this.teacher_id = ''
    },
  },
})
