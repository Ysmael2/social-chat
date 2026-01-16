import { defineStore } from "pinia"
import * as Ably from 'ably'
import { ref, computed } from "vue"

export const useAblyStore = defineStore('ably',()=>{

    //estado
    const ablyClient = ref<any | null>(null)
    const isConnected = ref(false)
    const connectionError = ref<string | null>(null)
    const activeChannels= ref<Set<string>>(new Set())
    const messages = ref<Map<string, any[]>>(new Map())

    //getters
    const geIsConnected = computed(()=> isConnected.value)
    const getConnectionError = computed(()=> connectionError.value)

    //acciones

    const initializeAbly = async (apiKey: string) => {
        try {
            
        } catch (error) {
            
        }

})