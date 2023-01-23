class UserProvider {
    public static createUser(id: number, username: string, email: string, password: string, class_id: number, created_at: Date, updated_at: Date) {
        return {
            id,
            username,
            email,
            password,
            class_id,
            created_at,
            updated_at
        }
    }
}

export default UserProvider;