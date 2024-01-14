import { createContext, useContext, useEffect, JSX, useState } from 'react';
import useGet from '../hooks/api/crud/useGet.ts';
import { HouseholdResponse, HouseholdsResponse } from '../types/api/response/household.ts';
import { useNavigate, useParams } from 'react-router-dom';
import usePost from '../hooks/api/crud/usePost.ts';
import { CreateHouseholdPayload } from '../types/api/payload/household.ts';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type HouseholdsContextType = {
  households: HouseholdsResponse | undefined;
  active: string | undefined;
  setActive: (id: string) => void;
  isLoading: boolean;
  refresh: () => Promise<void>;
  createHousehold: (data: CreateHouseholdPayload) => Promise<HouseholdResponse>;
  isCreating: boolean;
};

export const useHouseholdsContext = () => {
  return useContext(HouseholdsContext);
};

export const HouseholdsContext = createContext<HouseholdsContextType>(undefined!);

export const HouseholdsProvider = ({ children }: Props) => {
  const { id: urlID } = useParams<{ id: string | undefined }>();
  const [active, _setActive] = useState<string>();
  const { isLoading, get } = useGet<HouseholdsResponse>({ url: '/household/list' });
  const { post, isLoading: isCreating } = usePost<CreateHouseholdPayload, HouseholdResponse>({
    url: '/household/create',
  });
  const [households, setHouseholds] = useState<HouseholdsResponse>();
  const navigate = useNavigate();

  const refresh = async () => {
    const _households = await get();
    if (_households) {
      setHouseholds(_households);
    }
  };
  const setActive = (id: string) => {
    _setActive(id);
    navigate(`${id}/dashboard`);
  };

  const createHousehold = (data: CreateHouseholdPayload) => {
    return new Promise<HouseholdResponse>((resolve, reject) => {
      post(data)
        .then(res => {
          setHouseholds(prevState => [...(prevState ?? []), res]);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (urlID) {
      _setActive(urlID);
    }
  }, [urlID]);

  useEffect(() => {
    if (households && households.length > 0 && !urlID) {
      setActive(households[0]._id);
    }
  }, [households]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <HouseholdsContext.Provider
      value={{ households, active, setActive, isLoading, refresh, createHousehold, isCreating }}>
      {children}
    </HouseholdsContext.Provider>
  );
};
