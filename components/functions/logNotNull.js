export function logNotNull(updated_list) {
    let count = 1
    
    updated_list.map((step, index) => {
        if (step.updated_at !== null) {
            count = index + 1
        }
    })

    return count
}