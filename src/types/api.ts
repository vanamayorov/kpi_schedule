export interface ILesson {
    day_number: string;
    day_name: string;
    lesson_name: string;
    lesson_full_name: string;
    lesson_number: string;
    lesson_room: string;
    lesson_type: string;
    teacher_name: string;
    lesson_week: string;
    time_start: string;
    time_end: string;
}


export interface IGroupsList {
    group_full_name: string;
    group_id: number;
    group_okr: string;
    group_prefix: string;
    group_type: string;
    group_url: string;
}