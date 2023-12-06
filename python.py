import numpy as np

# Given vector x
x_vector = np.array([2, 3, 5, 7, 9])

# Given matrix M
M_matrix = np.array([
    [0.7, 0.7],
    [0.5, 0.2],
    [0.5, 0.0],
    [0.7, 0.3],
    [0.6, 0.0],
    [0.5, 0.4],
    [0.2, 0.6],
    [0.4, 0.0],
    [0.2, 0.3],
    [0.6, 0.9],
    [0.2, 0.0],
    [0.5, 0.6],
    [0.4, 0.2],
    [0.1, 0.0]
])

# Reshape x_vector to be a column vector
x_col_vector = x_vector.reshape(-1, 1)

# Check if the number of rows in M matches the size of x vector
if M_matrix.shape[0] != x_col_vector.shape[0]:
    print("The number of rows in matrix M must match the size of vector x.")

# Calculate the result of M*x (matrix-vector multiplication)
result = M_matrix.dot(x_col_vector)

# Calculate the sum of the elements in the result
result_sum = np.sum(result)

result_sum
