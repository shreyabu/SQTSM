package org.lei.personalized_advertisement_system.config;

import org.lei.personalized_advertisement_system.DTO.ErrorDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Provides global exception handling across all @RequestMapping methods in Spring MVC.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles exceptions thrown due to invalid method arguments, such as form validation failures.
     *
     * @param e the exception that was thrown during method argument validation
     * @return a ResponseEntity containing the errors mapped by field names with corresponding messages
     */
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        // Extract field errors and compose error map
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    /**
     * Handles generic exceptions that might be thrown in the application.
     *
     * @param e the caught exception
     * @return a ResponseEntity with the error details and a bad request status
     */
    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleExceptions(Exception e) {
        // Return a structured error message
        return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
    }
}


