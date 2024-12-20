import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty({
    description: '응답 결과',
    type: 'boolean',
    example: true,
  })
  success: boolean;
}
