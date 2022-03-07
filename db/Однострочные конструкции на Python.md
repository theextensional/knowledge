---
tags: [python]
---
# Однострочные конструкции на Python

## Распаковка

```python
sizes = input()
sizes = sizes.strip()
sizes = sizes.split()
x = sizes[0]
y = sizes[1]
z = sizes[2]
print(f'{x=}, {y=}, {z=}')
```

```python
x, y, z = input().strip().split()
print(f'{x=}, {y=}, {z=}')
```

## Map вместо цикла

```python
x, y, z = input().strip().split()
x = int(x)
y = int(y)
z = int(z)
volume = x * y * z
print(f'{volume=}')
```

```python
x, y, z = map(int, input().strip().split())
volume = x * y * z
print(f'{volume=}')
```

## Reduce вместо цикла

```python
x, y, z = map(int, input().strip().split())
volume = x * y * z
print(f'{volume=}')
```

```python
from functools import reduce

volume = reduce(lambda x, y: x * y,map(int, input().strip().split()))
print(f'{volume=}')
```

## Comprehensions вместо цикла

```python
names = ['Христофор', 'Адемар', 'Тэя', 'Стефания', 'Архип']
names_starts_a = []
for name in names:
    if name.startswith('А')
        names_starts_a.append(name)
print(names_starts_a)
```

```python
names = ['Христофор', 'Адемар', 'Тэя', 'Стефания', 'Архип']
names_starts_a = [name for name in names if name.startswith('А')]
print(names_starts_a)
```

## Filter вместо цикла или comprehensions

```python
names = ['Христофор', 'Адемар', 'Тэя', 'Стефания', 'Архип']
names_starts_a = filter(lambda name: name.startswith('А'), names)
print(list(names_starts_a))
```

## Быстрое копирование списка

```python
numbers = [1, 2, 3]
another_numbers = numbers
another_numbers.append(100)
print(another_numbers) # [1, 2, 3, 100]
print(numbers) #[1, 2, 3, 100]

another_numbers = numbers[:]
another_numbers.append(200)
print(another_numbers) # [1, 2, 3, 100, 200]
print(numbers) #[1, 2, 3, 100]
```

## Обратить (перевернуть) список

```python
numbers = [1, 2, 3]
print(numbers[::-1]) # [3, 2, 1]
```

## In вместо if

```python
name = 'Kenny'
if name == 'Stan' or name == 'Kyle' or name == 'Eric':
    print(name)

if name in ('Stan', 'Kyle', 'Eric'):
    print(name)
```

## All вместо сложного if

```python
a = b = c = d = e = True
if a and b and c and d and e:
    print('ok')

if all((a, b, c, d, e)):
    print('ok')
```

## Any вместо сложного if

```python
a = b = d = e = None
c = True
if a or b or c or d or e:
    print('ok')

if any((a, b, c, d, e)):
    print('ok')
```

## Тернарный оператор

```python
if user.active:
    color = 'green'
else:
    color = 'red'
```

```python
color = 'green' if user.active else 'red'
```

## Конфигурирование

```python
class User:
    def __init__(self, group: str):
        self.group = group

user = User(gourp='admin')

if user.group == 'admin':
    process_admin_request(user, request)
elif user.group == 'manager':
    process_manager_request(user, request)
elif user.group == 'client':
    process_client_request(user, request)
```

```python
group_to_method = {
    'admin': process_admin_request,
    'manager': process_manager_request,
    'client': process_client_request
}
group_to_method[user.group](user, request)
```

## Ссылки

* [Источник](https://youtu.be/LkHCy5JZtsA)
* [Python](Python.md)
