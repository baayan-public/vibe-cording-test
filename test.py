from typing import List

def calculate_average(numbers: List[int]) -> float:
    """
    数字のリストを受け取り、その平均を計算します。

    :param numbers: 平均を計算する数字のリスト
    :type numbers: List[int]
    :return: 数字のリストの平均値
    :rtype: float
    """
    return sum(numbers) / len(numbers)
