import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHouseholdsContext } from './HouseholdsContext.tsx';
import useGet from '../hooks/api/crud/useGet.ts';
import usePost from '../hooks/api/crud/usePost.ts';
import { CreateTagPayload } from '../types/api/payload/tag.ts';
import { TagResponse, TagsResponse } from '../types/api/response/tag.ts';

type Props = {
  children: React.ReactNode;
};

type TagsContextType = {
  tags: TagsResponse | undefined;
  isLoading: boolean;
  createTag: (data: Omit<CreateTagPayload, 'householdId'>) => Promise<TagResponse>;
  isCreating: boolean;
};

export const useTagsContext = () => {
  return useContext(TagsContext);
};

export const TagsContext = createContext<TagsContextType>(undefined!);

export const TagsProvider = ({ children }: Props) => {
  const { active } = useHouseholdsContext();
  const { get, isLoading } = useGet<TagsResponse>({
    url: '/tag/list',
    params: {
      householdId: active,
    },
  });
  const [tags, setTags] = useState<TagsResponse>();
  const { post, isLoading: isCreating } = usePost<CreateTagPayload, TagResponse>({ url: '/tag/create' });

  const refresh = async () => {
    const _tags = await get();
    if (_tags) {
      setTags(_tags);
    }
  };

  const createTag = (data: Omit<CreateTagPayload, 'householdId'>) => {
    return new Promise<TagResponse>((resolve, reject) => {
      post({ ...data, householdId: active as string })
        .then(res => {
          setTags(prevState => [...(prevState ?? []), res]);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (active) {
      refresh();
    }
  }, [active]);

  return <TagsContext.Provider value={{ isCreating, isLoading, tags, createTag }}>{children}</TagsContext.Provider>;
};
