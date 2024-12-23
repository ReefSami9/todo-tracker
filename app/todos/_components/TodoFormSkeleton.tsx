import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';
import React from 'react';

const TodoFormSkeleton = () => {
      return (
            <Box className="max-w-xl mx-auto">
                  <Skeleton height="2rem" />
                  <Skeleton height="20rem" />
            </Box>
      );
};

export default TodoFormSkeleton;