<template>
    <br><br><br><br>
<div class="friends-container">

    <div class="header pa-4">
        <h1 class="text-h5">Solicitudes de amistad</h1> 
        <div class="d-flex align-center">
            <v-container class="pa-0">
                
                
                <v-chip variant="outlined" color="primary">
                    pendientes
                </v-chip>
            </v-container>
        </div>
    </div>

    <!-- contenido principal -->

    <v-container fluid>
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="mb-4" rounded="lg" >

                </v-card>


            </v-col>
        </v-row>


    </v-container>

</div>
</template>


<script lang="ts" setup>
</script>

<style scoped>
.friends-container {
    min-height: calc(100vh - 64px);
    background-color: transparent;
}
</style>