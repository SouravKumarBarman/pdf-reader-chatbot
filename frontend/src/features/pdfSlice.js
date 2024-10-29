import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    pdf_id:""
}

export const pdfSlice = createSlice({
    name:"pdf",
    initialState,
    reducers:{
        setPdfId:(state,action)=>{
            state.pdf_id=action.payload
        }
    }
})

export const {setPdfId} = pdfSlice.actions

export const reducers=pdfSlice.reducer
export default pdfSlice.reducer