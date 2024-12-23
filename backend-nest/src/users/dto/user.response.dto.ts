import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  id: number;

  @ApiProperty({ example: 'user1', description: '유저 ID' })
  userId: string;

  @ApiProperty({ example: '100000123', description: '로스트아크 고유 아이디' })
  clientId: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PY-pIMoh1QKJeRxoYNyi9Ya1xWGfV29_lybHaFSC0vo',
    description: '로스트아크 API 키',
  })
  apiKey: string;

  @ApiProperty({ example: '2024-06-05T12:00:00Z', description: '생성된 날짜' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-06T12:00:00Z',
    description: '업데이트된 날짜',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: '삭제된 날짜 (null일 수 있음)',
    required: false,
  })
  deletedAt?: Date | null;
}
