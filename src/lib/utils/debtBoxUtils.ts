import type { DebtBoxProject, DebtBoxToken } from "$lib/types";

export async function getDebtBoxData() {
    let projects: DebtBoxProject[] = [];
    let tokens: DebtBoxToken[] = [];

    try {
        const response = await fetch('https://8kf4sjqu5e.execute-api.us-east-1.amazonaws.com/v1/projects', {
            method: 'GET',
            headers: {
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            },
        });
        const res: {data: DebtBoxProject[], included: DebtBoxToken[]} = await response.json();
        // console.log("🚀 ~ getDebtBoxData ~ data:", res)
        
        if (res.data.length > 0) {
            projects = res.data.filter((project: DebtBoxProject) => project.type === "projects" && project.attributes.name !== 'IN8');
            tokens = res.included.filter((item: DebtBoxToken) => item.type === "tokens");
        }
    } catch (error) {
        console.error('Error - DebtBoxData() - could not fetch data');
    }

    return {
        projects,
        tokens,
    };
}