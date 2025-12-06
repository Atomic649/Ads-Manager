import { getAxios, getAxiosWithAuth } from "@/utils/axiosInstance";
import { checkNetwork } from "@/utils/utility";

class CallAPIBoost {
	// Campaigns
	async CreateBoostCampaignAPI(data: {
		name?: string;
		businessId: number;
		productId: number;
		ownerId: string;
		budget: number;
		dailyCap?: number;
		startDate: string; // ISO string
		endDate: string; // ISO string
		bidStrategy: "AUTO" | "MANUAL";
		maxBid?: number;
	}): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.post("/boost", data);
			console.log("📝 Create Boost Campaign:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Create Boost Campaign Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Create Boost Campaign failed" };
		}
	}

	async GetBoostCampaignsAPI(): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const res = await getAxios().get("/boost");
			console.log("📝 Get Boost Campaigns:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Get Boost Campaigns Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Get Boost Campaigns failed" };
		}
	}

	async GetBoostCampaignByIdAPI(id: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const res = await getAxios().get(`/boost/${id}`);
			console.log("📝 Get Boost Campaign By ID:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Get Boost Campaign By ID Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Get Boost Campaign By ID failed" };
		}
	}

	async UpdateBoostCampaignAPI(id: number, data: Partial<{
		status: "ACTIVE" | "PAUSED" | "COMPLETED" | "CANCELLED";
		bidStrategy: "AUTO" | "MANUAL";
		maxBid: number;
		dailyCap: number;
	}>): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.put(`/boost/${id}`, data);
			console.log("📝 Update Boost Campaign:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Update Boost Campaign Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Update Boost Campaign failed" };
		}
	}

	async DeleteBoostCampaignAPI(id: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.delete(`/boost/${id}`);
			console.log("📝 Delete Boost Campaign:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Delete Boost Campaign Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Delete Boost Campaign failed" };
		}
	}

	// Results
	async CreateBoostResultAPI(campaignId: number, data: Partial<{ date: string; impressions: number; clicks: number; ctr: number; costSpent: number }>): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.post(`/boost/${campaignId}/result`, data);
			console.log("📝 Create Boost Result:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Create Boost Result Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Create Boost Result failed" };
		}
	}

	async GetBoostResultsAPI(campaignId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const res = await getAxios().get(`/boost/${campaignId}/result`);
			console.log("📝 Get Boost Results:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Get Boost Results Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Get Boost Results failed" };
		}
	}

	async UpdateBoostResultAPI(resultId: number, data: Partial<{ date: string; impressions: number; clicks: number; ctr: number; costSpent: number }>): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.put(`/boost/result/${resultId}`, data);
			console.log("📝 Update Boost Result:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Update Boost Result Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Update Boost Result failed" };
		}
	}

	async DeleteBoostResultAPI(resultId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.delete(`/boost/result/${resultId}`);
			console.log("📝 Delete Boost Result:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Delete Boost Result Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Delete Boost Result failed" };
		}
	}

	// Spend logs
	async CreateSpendLogAPI(campaignId: number, data: { spend: number; timestamp?: string }): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.post(`/boost/${campaignId}/log/spend`, data);
			console.log("📝 Create Spend Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Create Spend Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Create Spend Log failed" };
		}
	}

	async GetSpendLogsAPI(campaignId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const res = await getAxios().get(`/boost/${campaignId}/log/spend`);
			console.log("📝 Get Spend Logs:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Get Spend Logs Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Get Spend Logs failed" };
		}
	}

	async UpdateSpendLogAPI(spendId: number, data: Partial<{ spend: number; timestamp: string }>): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.put(`/boost/log/spend/${spendId}`, data);
			console.log("📝 Update Spend Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Update Spend Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Update Spend Log failed" };
		}
	}

	async DeleteSpendLogAPI(spendId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.delete(`/boost/log/spend/${spendId}`);
			console.log("📝 Delete Spend Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Delete Spend Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Delete Spend Log failed" };
		}
	}

	// Bid logs
	async CreateBidLogAPI(campaignId: number, data: { bidValue: number; reason?: string; timestamp?: string }): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.post(`/boost/${campaignId}/log/bid`, data);
			console.log("📝 Create Bid Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Create Bid Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Create Bid Log failed" };
		}
	}

	async GetBidLogsAPI(campaignId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const res = await getAxios().get(`/boost/${campaignId}/log/bid`);
			console.log("📝 Get Bid Logs:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Get Bid Logs Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Get Bid Logs failed" };
		}
	}

	async UpdateBidLogAPI(bidId: number, data: Partial<{ bidValue: number; reason: string; timestamp: string }>): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.put(`/boost/log/bid/${bidId}`, data);
			console.log("📝 Update Bid Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Update Bid Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Update Bid Log failed" };
		}
	}

	async DeleteBidLogAPI(bidId: number): Promise<any> {
		if (!(await checkNetwork())) return { message: "No Network Connection" };
		try {
			const axiosAuth = await getAxiosWithAuth();
			const res = await axiosAuth.delete(`/boost/log/bid/${bidId}`);
			console.log("📝 Delete Bid Log:", res.data);
			return res.data;
		} catch (error: any) {
			console.error("❌ Delete Bid Log Error:", error.response?.data || error.message);
			return { message: error.response?.data?.message || "Delete Bid Log failed" };
		}
	}

	// Convenience helpers
	async PauseCampaignAPI(id: number): Promise<any> {
		return this.UpdateBoostCampaignAPI(id, { status: "PAUSED" });
	}

	async ResumeCampaignAPI(id: number): Promise<any> {
		return this.UpdateBoostCampaignAPI(id, { status: "ACTIVE" });
	}
}

export const callAPIBoost = new CallAPIBoost();