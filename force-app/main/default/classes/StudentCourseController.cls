/**
 * @description Controller for managing Student and Course relationships
 * Provides methods to fetch courses for a student and create new course registrations
 */
public class StudentCourseController {
    
    /**
     * @description Fetch all courses registered by a specific student
     * @param studentId The ID of the student to fetch courses for
     * @return List<Course__c> List of courses registered by the student
     */
    @AuraEnabled(cacheable=true)
    public static List<Course__c> getCoursesByStudentId(Id studentId) {
        if (studentId == null) {
            return new List<Course__c>();
        }
        
        return [
            SELECT Id, Name, Course_Name__c, Fee__c, Student__c 
            FROM Course__c 
            WHERE Student__c = :studentId 
            ORDER BY CreatedDate DESC
        ];
    }
    
    /**
     * @description Create a new course record for a student
     * @param courseName The name of the course
     * @param fee The course fee
     * @param studentId The ID of the student registering for the course
     * @return Course__c The newly created course record
     */
    public static Course__c createCourseForStudent(String courseName, Decimal fee, Id studentId) {
        Course__c newCourse = new Course__c(
            Course_Name__c = courseName,
            Fee__c = fee,
            Student__c = studentId
        );
        
        try {
            insert newCourse;
            return newCourse;
        } catch (DmlException e) {
            // Handle exception - in a real scenario, you might want to log this
            // and return null or throw a custom exception
            System.debug('Error creating course: ' + e.getMessage());
            throw new CourseCreationException('Failed to create course: ' + e.getMessage());
        }
    }
    
    /**
     * @description Create a new course record for a student with validation
     * @param courseName The name of the course (required)
     * @param fee The course fee (must be positive)
     * @param studentId The ID of the student registering for the course (required)
     * @return Course__c The newly created course record
     * @throws CourseCreationException If validation fails or course creation fails
     */
    @AuraEnabled
    public static Course__c createCourseWithValidation(String courseName, Decimal fee, Id studentId) {
        // Validate inputs
        if (String.isBlank(courseName)) {
            throw new CourseCreationException('Course name is required');
        }
        
        if (studentId == null) {
            throw new CourseCreationException('Student ID is required');
        }
        
        if (fee == null || fee <= 0) {
            throw new CourseCreationException('Course fee must be a positive number');
        }
        
        // Validate student exists
        try {
            Student__c student = [SELECT Id FROM Student__c WHERE Id = :studentId LIMIT 1];
        } catch (QueryException e) {
            throw new CourseCreationException('Student not found with ID: ' + studentId);
        }
        
        return createCourseForStudent(courseName, fee, studentId);
    }
    
    /**
     * @description Custom exception for course creation errors
     */
    public class CourseCreationException extends Exception {}
}