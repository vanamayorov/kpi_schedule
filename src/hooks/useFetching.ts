import { useEffect, useState } from "react";
import api from "../api";
import { ILesson } from "../types/api";

export const useFetching = (queryParam: string) => {
    const [groupLessons, setGroupLessons] = useState<ILesson[]>([]);
    const [groupName, setGroupName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    let week = 1;

    async function fetching<T>(...args: T[]) {
        if (!queryParam) {
            setError("");
            setGroupLessons([]);
            setGroupName("");
            return;
        }

        try {
            setError("");
            setIsLoading(true);
            const { data: lessonsData } = await api.endpoints.lessons(queryParam);
            const { data: groupData } = await api.endpoints.group(queryParam);
            const { data: weekData } = await api.endpoints.week();
            week = weekData.data;
            setGroupLessons(lessonsData.data);
            setGroupName(groupData.data.group_full_name);
        } catch (e) {
            setError("Розкладу ще немає");
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetching();
    }, [queryParam]);

    return { groupLessons, groupName, week, isLoading, error, setError };
}