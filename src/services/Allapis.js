import { baseUrl } from "./base";
import { commonStructure } from "./commonstructure";

export const accessAppointment=async()=>{
return await commonStructure('GET',`${baseUrl}/appointments`,{})
}

export const deleteAppointment=async(id)=>{
    return await commonStructure('DELETE',`${baseUrl}/appointments/${id}`,{})
}