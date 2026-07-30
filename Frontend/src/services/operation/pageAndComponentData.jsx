import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../api';
export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");

    let result = [];
    try{
        const response = await apiConnector("POST",catalogData.CATEGORYPAGEDATA_API,
            {
                catId : categoryId,
            }
        );
        if(!response?.data.success){
            // toast.dismiss(toastId);
            throw new Error("Could not fetch Catagory page data"); 

        }
        result = response?.data;
    }catch(err){
        console.log("CATALOG PAGE DATA API ERROR",err);
        // toast.error(err.message);
        result = err?.response?.data;
        // toast.dismiss(toastId);
    }
    toast.dismiss(toastId);
    return result;
}
